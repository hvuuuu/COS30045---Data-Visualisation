function toggleChart(chartId) {
    let chart = document.getElementById(chartId);
    if (chart.style.display === "none") {
        chart.style.display = "block";
    } else {
        chart.style.display = "none";
    }
}
