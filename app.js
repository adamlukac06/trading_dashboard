<!DOCTYPE html>
var ctx = document.getElementById('candleChart').getContext('2d');
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Trading Dashboard</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> <!-- Chart.js library -->
</head>
<body>
    <select id="tokenSelect">
        <option value="BTCUSDT">BTCUSDT</option>
        <option value="ETHUSDT">ETHUSDT</option>
        <option value="XRPUSDT">XRPUSDT</option>
    </select>
    <canvas id="candleChart"></canvas>

    <script src="app.js"></script> <!-- Your JavaScript will go here -->
</body>
</html>
