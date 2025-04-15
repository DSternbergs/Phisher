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

function isUnusual(url) {
    return (
      url.includes("-") ||
      url.includes("@") ||
      url.split(".").length > 3 ||
      url.match(/[0-9]{6,}/)
    );
  }
  
  chrome.webNavigation.onCompleted.addListener(async (details) => {
    const url = details.url;
  
    // Ignore Chrome internal URLs and new tab pages
    if (
      url.startsWith("chrome://") ||
      url.startsWith("chrome-extension://") ||
      url === "about:blank" ||
      url === "about:newtab"
    ) {
      return;
    }
  
    // Run heuristics
    if (isUnusual(url)) {
      chrome.tabs.update(details.tabId, {
        url: chrome.runtime.getURL("warning.html") + `?original=${encodeURIComponent(url)}`
      });
    }
  }, {
    url: [{ urlMatches: 'http://*/*' }, { urlMatches: 'https://*/*' }]
  });
  