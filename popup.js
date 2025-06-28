document.getElementById('activateOverlay').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({active: true, currentWindow: true});

  if (tab) {
    const forbiddenProtocols = ['chrome:', 'chrome-extension:', 'about:', 'file:'];
    const isForbidden = forbiddenProtocols.some(protocol => tab.url.startsWith(protocol));

    if (isForbidden) {
      const statusDiv = document.createElement('div');
      statusDiv.textContent = "Cannot activate overlay on this type of page (e.g., Chrome internal pages, extension pages). Please navigate to a regular website.";
      statusDiv.style.color = 'orange';
      document.body.appendChild(statusDiv);
      return;
    }

    try {
      // Inject the content script if it's not already running
      await chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['content.js']
      });
      // Now send the message to the injected script
      await chrome.tabs.sendMessage(tab.id, {action: "toggleOverlay"});
      window.close(); // Close the popup after activating the overlay
    } catch (error) {
      console.error("Error during script injection or message sending:", error);
      const statusDiv = document.createElement('div');
      statusDiv.textContent = "Could not activate overlay. Ensure you are on a valid trading page and the extension is enabled.";
      statusDiv.style.color = 'red';
      document.body.appendChild(statusDiv);
    }
  }
});