// content.js

// Ensure this script only runs its top-level declarations once per page load
if (typeof window.hoodHeroContentScriptInitialized === 'undefined') {
  window.hoodHeroContentScriptInitialized = true;

  let overlayIframe = null;
  let currentIframeId = null; // Unique ID for the currently active iframe

  function generateUniqueId() {
    return 'iframe-' + Date.now() + Math.random().toString(36).substring(2, 9);
  }

  function createOverlayIframe() {
    currentIframeId = generateUniqueId(); // Generate a new ID for each new iframe
    

    overlayIframe = document.createElement('iframe');
    overlayIframe.id = 'options-optimizer-iframe';
    overlayIframe.src = chrome.runtime.getURL('overlay.html');
    overlayIframe.style.position = 'fixed';
    overlayIframe.style.top = '20px'; // Revert to fixed position
    overlayIframe.style.right = '20px'; // Revert to fixed position
    overlayIframe.style.width = '302px'; // Revert to fixed width
    overlayIframe.style.height = '402px'; // Revert to fixed height
    overlayIframe.style.border = 'none';
    overlayIframe.style.zIndex = '99999';
    overlayIframe.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)'; // Re-add shadow
    overlayIframe.style.backgroundColor = '#e0e0e0'; // Set iframe background to solid gray

    // Removed: overlayIframe.setAttribute('allowtransparency', 'true');
    // Removed: overlayIframe.setAttribute('wmode', 'transparent');
    // Removed: overlayIframe.style.opacity = '0.999';

    // Add load listener BEFORE appending to body
    overlayIframe.onload = () => {
      // Send the unique ID to the iframe once it's loaded
      if (overlayIframe && overlayIframe.contentWindow) {
        
        overlayIframe.contentWindow.postMessage({ action: 'initIframe', iframeId: currentIframeId }, '*');
      }
    };

    document.body.appendChild(overlayIframe);
  }

  function removeOverlayIframe() {
    if (overlayIframe) {
      
      overlayIframe.remove();
      overlayIframe = null;
      currentIframeId = null; // Clear the ID when iframe is removed
    }
  }

  function getCurrentPriceFromPage() {
    let currentPrice = 1.00; // Default value if not found
    const currentPriceLabelTd = Array.from(document.querySelectorAll('td')).find(td => td.textContent.includes('Current price'));
    if (currentPriceLabelTd && currentPriceLabelTd.nextElementSibling && currentPriceLabelTd.nextElementSibling.nextElementSibling) {
      const priceText = currentPriceLabelTd.nextElementSibling.nextElementSibling.textContent;
      currentPrice = parseFloat(priceText.replace(/[^0-9.-]+/g,""));
    }
    return currentPrice;
  }

  // Listen for messages from the popup (to toggle iframe)
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleOverlay") {
      if (overlayIframe) {
        removeOverlayIframe();
      } else {
        createOverlayIframe();
      }
    }
  });

  // Listen for messages from the iframe (overlay.js)
  window.addEventListener('message', (event) => {
    

    // Only process messages from our own origin and with expected data structure
    if (!event.data || !event.data.action) {
      
      return;
    }

    // Handle close message first, as it invalidates the iframe
    if (event.data.action === 'closeOverlay') {
      
      // Only remove if the message is from the currently active iframe
      if (event.data.iframeId === currentIframeId) {
        removeOverlayIframe();
      }
      return; // Always return after handling close
    }

    // For all other messages, ensure it's from the currently active iframe
    if (event.data.iframeId !== currentIframeId) {
      
      return; // Ignore messages from stale iframes
    }

    if (event.data.action === 'requestCurrentPrice') {
      const price = getCurrentPriceFromPage();
      // Ensure iframe is still valid before posting message
      if (overlayIframe && overlayIframe.contentWindow) {
        overlayIframe.contentWindow.postMessage({ action: 'updateCurrentPrice', price: price }, '*');
      }
    } else if (event.data.action === 'iframeReady') {
      // Iframe is ready, send it the initial price
      if (overlayIframe && overlayIframe.contentWindow) {
        const price = getCurrentPriceFromPage();
        overlayIframe.contentWindow.postMessage({ action: 'updateCurrentPrice', price: price }, '*');
      }
    }
  });
}