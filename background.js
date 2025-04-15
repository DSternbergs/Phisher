let blacklist = [];

async function loadBlacklistAndBlock() {
  const response = await fetch(chrome.runtime.getURL('blacklist.txt'));
  const text = await response.text();
  blacklist = text
    .split('\n')
    .map(domain => domain.trim())
    .filter(domain => domain.length > 0);

  const rules = blacklist.map((domain, index) => ({
    id: index + 1, // Rule IDs must be positive integers
    priority: 1,
    action: {
      type: "redirect",
      redirect: { url: chrome.runtime.getURL("warning.html") }
    },
    condition: {
      urlFilter: `||${domain}`, // Matches the domain
      resourceTypes: ["main_frame"]
    }
  }));

  // Remove any existing rules, then add ours
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: rules.map(rule => rule.id),
    addRules: rules
  });
}

// Load rules when extension is installed/updated
chrome.runtime.onInstalled.addListener(() => {
  loadBlacklistAndBlock();
});
