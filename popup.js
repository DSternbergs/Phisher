const checkbox = document.getElementById('check');

// Load saved state when the popup opens
chrome.storage.local.get('enabled', (data) => {
  checkbox.checked = data.enabled ?? true; // Default to 'true' if not set
  console.log('Popup loaded. Extension enabled:', checkbox.checked);  // Debugging log
});

// Save state when the checkbox is toggled
checkbox.addEventListener('change', () => {
  chrome.storage.local.set({ enabled: checkbox.checked }, () => {
    console.log('Checkbox state saved:', checkbox.checked);  // Debugging log
  });
});
