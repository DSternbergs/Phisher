const checkbox = document.getElementById('check');

chrome.storage.local.get('enabled', (data) => {
    checkbox.checked = data.enabled ?? true;
});

checkbox.addEventListener('change', () => {
    chrome.storage.local.set({ enabled: checkbox.checked });
});