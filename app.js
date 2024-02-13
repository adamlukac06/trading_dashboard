<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Trading Dashboard</title>
    <!-- Include Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <!-- Include chartjs-chart-financial -->
    <script src="https://unpkg.com/chartjs-chart-financial"></script>
</head>
<body>
    <select id="tokenSelect">
        <option value="BTCUSDT">BTCUSDT</option>
        <option value="ETHUSDT">ETHUSDT</option>
        <option value="XRPUSDT">XRPUSDT</option>
    </select>
    <canvas id="candleChart"></canvas>

    <script src="app.js"></script>
</body>
</html>
