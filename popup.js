const checkbox = document.getElementById('check');

// Load saved state when the popup opens
chrome.storage.local.get('enabled', (data) => {
  checkbox.checked = data.enabled ?? true; // Default set to true
});

// Save state of the switch when popup closes.
checkbox.addEventListener('change', () => {
  chrome.storage.local.set({ enabled: checkbox.checked }, () => {
  });
});
