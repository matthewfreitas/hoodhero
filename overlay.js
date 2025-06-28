// overlay.js - Runs inside the iframe

let currentOptionPrice = 0;
let myIframeId = null; // Unique ID for this iframe instance

function updatePrices() {
  const profitPercent = parseFloat(document.getElementById('profit-percent').value) / 100;
  const stopLossPercent = parseFloat(document.getElementById('stop-loss-percent').value) / 100;

  const targetProfitPrice = currentOptionPrice * (1 + profitPercent);
  const targetStopLossPrice = currentOptionPrice * (1 - stopLossPercent);

  document.getElementById('target-profit-price').innerText = targetProfitPrice.toFixed(2);
  document.getElementById('target-stop-loss-price').innerText = targetStopLossPrice.toFixed(2);
}

function copyToClipboard(text) {
  // Fallback for Permissions Policy violation
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in MS Edge.
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.opacity = '0'; // Hide it
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    const successful = document.execCommand('copy');
  } catch (err) {
  }
  document.body.removeChild(textarea);
}

// Listen for messages from the parent (content.js)
window.addEventListener('message', (event) => {
  if (event.source === window.parent) {
    if (event.data && event.data.action === 'updateCurrentPrice') {
      currentOptionPrice = event.data.price;
      document.getElementById('current-price').innerText = currentOptionPrice.toFixed(2);
      updatePrices();
    } else if (event.data && event.data.action === 'initIframe') {
      myIframeId = event.data.iframeId;
      // Once we have our ID, signal that we are ready AND request the initial price
      window.parent.postMessage({ action: 'iframeReady', iframeId: myIframeId }, '*');
      window.parent.postMessage({ action: 'requestCurrentPrice', iframeId: myIframeId }, '*');
    }
  }
});

// Event listeners for UI elements
document.getElementById('profit-percent').addEventListener('input', updatePrices);
document.getElementById('stop-loss-percent').addEventListener('input', updatePrices);
document.getElementById('copy-profit').addEventListener('click', () => copyToClipboard(document.getElementById('target-profit-price').innerText));
document.getElementById('copy-stop-loss').addEventListener('click', () => copyToClipboard(document.getElementById('target-stop-loss-price').innerText));
document.getElementById('refresh-price').addEventListener('click', () => {
  // Request current price from parent when refresh button is clicked
  if (myIframeId) {
    window.parent.postMessage({ action: 'requestCurrentPrice', iframeId: myIframeId }, '*');
  }
});
document.getElementById('close-overlay').addEventListener('click', () => {
  if (myIframeId) {
    window.parent.postMessage({ action: 'closeOverlay', iframeId: myIframeId }, '*');
  }
});

updatePrices(); // Initial calculation with default/received price
