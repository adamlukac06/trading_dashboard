// Initialize the chart
const chart = LightweightCharts.createChart(document.getElementById('candleChart'), {
    width: 800,
    height: 500,
    layout: {
        background: { color: '#00001a' }, // Match the body background color
        textColor: 'rgba(255, 255, 255, 0.9)', // Keep as is or adjust to match exact color
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
    upColor: 'green',
    downColor: 'red',
    borderDownColor: 'red',
    borderUpColor: 'green',
    wickDownColor: 'red',
    wickUpColor: 'green',
});

// Function to fetch and display data for the selected token
async function fetchData(token) {
    // Fetch candlestick data from Binance
    const candleResponse = await fetch(`https://api.binance.com/api/v3/klines?symbol=${token}&interval=1d&limit=100`);
    const candleData = await candleResponse.json();
    const formattedCandleData = candleData.map(d => ({
        time: d[0] / 1000, // Convert timestamp from milliseconds to seconds
        open: parseFloat(d[1]),
        high: parseFloat(d[2]),
        low: parseFloat(d[3]),
        close: parseFloat(d[4]),
    }));
    candleSeries.setData(formattedCandleData);

    // Map the token to CoinGecko's cryptocurrency ID
    // This mapping needs to be adjusted based on the tokens you're interested in
    const coinGeckoIdMap = {
        'BTCUSDT': 'bitcoin',
        'ETHUSDT': 'ethereum',
        'XRPUSDT': 'ripple',
        // Add more mappings as needed
    };
    const coinGeckoId = coinGeckoIdMap[token];

    // Fetch market cap data from CoinGecko
    if (coinGeckoId) {
        try {
            const url = `https://api.coingecko.com/api/v3/coins/${coinGeckoId}`;
            const marketCapResponse = await fetch(url);
            const marketCapData = await marketCapResponse.json();
            const marketCap = marketCapData.market_data.market_cap.usd; // Access the market cap in USD
            document.getElementById('marketCap').innerText = `Market Cap: $${marketCap.toLocaleString()}`;
        } catch (error) {
            console.error("Failed to fetch market cap from CoinGecko:", error);
            // Optionally, handle the error in the UI
        }
    } else {
        console.error("CoinGecko ID not found for token:", token);
        // Optionally, handle this case in the UI
    }
}

let refreshIntervalId; // Ensure this is declared at the top level of your script

// Function to start the data refresh process
function startDataRefresh(refreshRate) {
    // Clear any existing interval to prevent multiple intervals running
    if (refreshIntervalId) {
        clearInterval(refreshIntervalId);
    }

    // Set a new interval with the specified refresh rate
    refreshIntervalId = setInterval(() => {
        const currentToken = document.getElementById('tokenSelect').value;
        fetchData(currentToken);
    }, refreshRate);
}

document.addEventListener('DOMContentLoaded', () => {
    // Initial fetch for BTCUSDT
    fetchData('BTCUSDT');

    // Event listener for the dropdown
    document.getElementById('tokenSelect').addEventListener('change', function() {
        fetchData(this.value);
    });

    // Set an initial refresh rate for the chart
    const fixedRefreshRate = 1000; // Set refresh rate to 1000ms
    startDataRefresh(fixedRefreshRate);
});
