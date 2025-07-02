# ⏱️ Chrome Time Tracker Extension

A full-stack Chrome Extension that tracks the time you spend on websites and displays usage data on a custom dashboard. Built with JavaScript, Node.js, and Chrome Extensions API for boosting productivity! 🚀

---

## 📁 Project Structure

```

CHROME-TIME-TRACKER/
├── backend/                    # Express.js server
│   ├── models/                # MongoDB models (e.g., user/activity schemas)
│   ├── node\_modules/
│   ├── .env                   # Environment variables
│   ├── package.json
│   ├── package-lock.json
│   └── server.js              # Main server file
│
└── extension/                 # Chrome Extension
├── icons/                 # Extension icon
│   └── icon128.png
├── background.js          # Background script for tracking
├── dashboard.html         # Dashboard UI
├── dashboard.js           # Dashboard logic
├── manifest.json          # Extension metadata/config
├── popup.html             # Popup interface
└── popup.js               # Popup interaction logic

````


## 🌟 Features

✅ Tracks time spent on websites  
✅ Displays usage stats via a dashboard  
✅ Chrome extension popup for quick access  
✅ Node.js + Express backend for data persistence  
✅ Modular and scalable code structure

---

## 🛠️ Installation

### 🔌 Backend Setup

1. Navigate to the `backend/` directory:

   ```bash
   cd backend

2. Install dependencies:

   ```bash
   npm install

3. Set up your `.env` file:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string

4. Start the server:

   ```bash
   npm start
   ```

---

### 🧩 Extension Setup

1. Open Google Chrome and go to:
   `chrome://extensions/`

2. Enable **Developer mode**.

3. Click **Load unpacked** and select the `extension/` folder.

4. The extension is now installed and ready to use.

---

## 📦 Technologies Used

* **Frontend**: HTML, CSS, JavaScript
* **Extension APIs**: Chrome Extensions API (Background, Storage, Popup)
* **Backend**: Node.js, Express.js, MongoDB
* **Database**: MongoDB (via Mongoose)

---

## 📌 Useful Scripts

```bash
# Start backend server
npm start
```

---

## 📃 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Acknowledgements

Special thanks to the open-source community and tutorials that helped shape this project. 🌍
