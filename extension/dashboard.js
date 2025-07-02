async function fetchData() {
    const res = await fetch("http://localhost:5000/api/activity/default-user");
    return await res.json();
  }
  
  function generateChart(data) {
    const ctx = document.getElementById("chart").getContext("2d");
    const labels = data.map(d => d.hostname);
    const durations = data.map(d => d.duration);
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Seconds spent',
          data: durations,
          backgroundColor: 'rgba(54, 162, 235, 0.5)'
        }]
      }
    });
  }
  
  document.getElementById("downloadReport").addEventListener("click", async () => {
    const data = await fetchData();
    const csvContent = "data:text/csv;charset=utf-8,"
      + ["Hostname,Duration,Productive"]
      .concat(data.map(d => `${d.hostname},${d.duration},${d.productive}`))
      .join("\n");
  
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "weekly_report.csv");
    document.body.appendChild(link);
    link.click();
  });
  
  fetchData().then(generateChart);
  