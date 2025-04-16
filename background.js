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

const safeDomains = [
  "www.google.com",
  "google.com",
  "bing.com",
  "yahoo.com" 
];

function isSafeDomain(url) {
  try {
    const domain = new URL(url).hostname;
    return SafeDomains.includes(domain);
  } catch (e) {
    return false;
  }
}

function isUnusual(url) {
  try {
    const { hostname } = new URL(url);

    return (
      hostname.includes("-") ||
      hostname.includes("@") ||
      hostname.split(".").length > 3 ||
      hostname.match(/[0-9]{6,}/)
    );
  } catch (e) {
    return false;
  }
}
  
  chrome.webNavigation.onCompleted.addListener(async (details) => {
    chrome.storage.local.get('enabled', async (data) => {
      if (!data.enabled) {
        console.log("Extension disabled.");
        return;
      }
    })
    
    const url = details.url;
  
    // Only run for top-level frames (not iframes or widgets)
    if (details.frameId !== 0) return;
  
    console.log("Top-level URL:", url);
  
    // Bail on internal or extension URLs
    if (
      url.startsWith("chrome-untrusted://") ||
      url.startsWith("chrome://") ||
      url.startsWith("chrome-extension://") ||
      url.startsWith("chrome-search://") ||
      url.startsWith("about:") ||
      url === "about:blank"
    ) {
      return;
    }
  
    // Only handle real http/https pages
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return;
    }

    if (isSafeDomain(url)) {
      console.log("Safe domain, skipping...", url);
      return;
    }
  
    // Run heuristic check
    if (isUnusual(url)) {
      console.log("Suspicious URL detected! Redirecting:", url);
      chrome.tabs.update(details.tabId, {
        url: chrome.runtime.getURL("warning.html") + `?original=${encodeURIComponent(url)}`
      });
    }
  }, {
    url: [{ urlMatches: "http://*/*" }, { urlMatches: "https://*/*" }]
  });
  