let activeTabId = null;
let startTime = null;
let userId = "default-user"; // Can enhance with login

// List of productive sites
const productiveSites = ["github.com", "stackoverflow.com", "codesandbox.io", "youtube.com","facebook.com", "x.com", "instagram.com"];

// Helper to log activity
async function logActivity(url, start, end) {
  const duration = (end - start) / 1000; // in seconds
  const hostname = new URL(url).hostname;
  const productive = productiveSites.includes(hostname);

  try {
    await fetch("http://localhost:5000/api/activity", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        url,
        hostname,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        duration,
        productive
      })
    });
  } catch (err) {
    console.error("Failed to log activity:", err);
  }
}

// Call this whenever active tab changes or window focus changes
function handleTabChange(newTabId) {
  const now = new Date();

  if (activeTabId !== null && startTime !== null) {
    // Log previous tab's activity
    chrome.tabs.get(activeTabId, (tab) => {
      if (chrome.runtime.lastError) {
        // Tab might have closed, skip
        activeTabId = newTabId;
        startTime = now;
        return;
      }
      if (tab && tab.url && !tab.url.startsWith("chrome://")) {
        logActivity(tab.url, startTime, now);
      }
      // Update to new tab info
      activeTabId = newTabId;
      startTime = now;
    });
  } else {
    // First time initialization
    activeTabId = newTabId;
    startTime = now;
  }
}

// Listen for tab activation
chrome.tabs.onActivated.addListener((activeInfo) => {
  handleTabChange(activeInfo.tabId);
});

// Listen for window focus change (switching windows or minimizing)
chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    // No focused window (Chrome lost focus)
    // Log time spent on current tab and stop tracking
    if (activeTabId !== null && startTime !== null) {
      chrome.tabs.get(activeTabId, (tab) => {
        if (tab && tab.url && !tab.url.startsWith("chrome://")) {
          logActivity(tab.url, startTime, new Date());
        }
        activeTabId = null;
        startTime = null;
      });
    }
  } else {
    // Get active tab in the newly focused window
    chrome.tabs.query({ active: true, windowId: windowId }, (tabs) => {
      if (tabs.length > 0) {
        handleTabChange(tabs[0].id);
      }
    });
  }
});

// Also listen for tab removal, to log activity if the active tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
  if (tabId === activeTabId && startTime !== null) {
    chrome.tabs.get(tabId, (tab) => {
      // Tab is already removed, so get may error out
      if (!chrome.runtime.lastError) {
        if (tab && tab.url && !tab.url.startsWith("chrome://")) {
          logActivity(tab.url, startTime, new Date());
        }
      }
      activeTabId = null;
      startTime = null;
    });
  }
});

// Initialize on service worker start - get current active tab in focused window
chrome.windows.getLastFocused({ populate: true }, (window) => {
  if (window && window.focused) {
    const activeTab = window.tabs.find(tab => tab.active);
    if (activeTab) {
      activeTabId = activeTab.id;
      startTime = new Date();
    }
  }
});
