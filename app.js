// Initialize the chart
const chart = LightweightCharts.createChart(document.getElementById('candleChart'), {
    width: 600,
    height: 300,
    layout: {
        backgroundColor: '#000000',
        textColor: 'rgba(255, 255, 255, 0.9)',
    },
    grid: {
        vertLines: {
            color: 'rgba(197, 203, 206, 0.5)',
        },
        horzLines: {
            color: 'rgba(197, 203, 206, 0.5)',
        },
    },
    crosshair: {
        mode: LightweightCharts.CrosshairMode.Normal,
    },
    priceScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
    },
    timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
    },
});

// Add a candlestick series to the chart
const candleSeries = chart.addCandlestickSeries({
    upColor: 'rgba(255, 144, 0, 1)',
    downColor: '#000',
    borderDownColor: 'rgba(255, 144, 0, 1)',
    borderUpColor: 'rgba(255, 144, 0, 1)',
    wickDownColor: 'rgba(255, 144, 0, 1)',
    wickUpColor: 'rgba(255, 144, 0, 1)',
});

// Function to fetch and display data for the selected token
async function fetchData(token) {
    const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${token}&interval=1d&limit=100`);
    const data = await response.json();
    const formattedData = data.map(d => ({
        time: d[0] / 1000, // Convert timestamp from milliseconds to seconds
        open: parseFloat(d[1]),
        high: parseFloat(d[2]),
        low: parseFloat(d[3]),
        close: parseFloat(d[4]),
    }));
    candleSeries.setData(formattedData);
}

// Initial fetch for BTCUSDT
fetchData('BTCUSDT');

// Event listener for the dropdown
document.getElementById('tokenSelect').addEventListener('change', function() {
    fetchData(this.value);
});

let refreshIntervalId; // Variable to store the interval IDS

// Function to start the data refresh process
function startDataRefresh(token, refreshRate) {
    // Clear any existing interval to prevent multiple intervals running
    if (refreshIntervalId) {
        clearInterval(refreshIntervalId);
    }

    // Set a new interval with the specified refresh rate
    refreshIntervalId = setInterval(() => {
        fetchData(token);
    }, refreshRate);
}

// Set an initial refresh rate for the chart (optional)
const initialRefreshRate = 300000; // Example: 5 minutes in milliseconds
startDataRefresh(document.getElementById('tokenSelect').value, initialRefreshRate);

// Event listener for the Set Refresh Rate button
document.getElementById('setRefreshRate').addEventListener('click', function() {
    const refreshRate = document.getElementById('refreshRateInput').value; // Get the user input
    if (refreshRate) {
        startDataRefresh(document.getElementById('tokenSelect').value, parseInt(refreshRate, 10));
    } else {
        alert('Please enter a valid refresh rate.');
    }
});
