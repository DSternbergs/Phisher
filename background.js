let blacklist = []; // Stores the domains from blacklist.txt

async function loadBlacklistAndBlock() {  // Reads blacklist.txt
  const response = await fetch(chrome.runtime.getURL('blacklist.txt')); // Fetches the file
  const text = await response.text(); // Parses the file into arrays and makes sure its one domain per line
  blacklist = text
    .split('\n')
    .map(domain => domain.trim())
    .filter(domain => domain.length > 0);

  const rules = blacklist.map((domain, index) => ({   // Takes the list of blocked websites from blacklist.txt
    id: index + 1, // Rule IDs must be positive integers
    priority: 1,
    action: {
      type: "redirect",
      redirect: { url: chrome.runtime.getURL("warning.html") }  // Redirects user to warning.html if any of the blacklisted sites are being accessed.
    },
    condition: {
      urlFilter: `||${domain}`, // Match any page from domain
      resourceTypes: ["main_frame"]   // Ensures this only applies to the main webpage not images etc
    }
  }));

  // Remove any existing rules and add mine
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: rules.map(rule => rule.id),
    addRules: rules
  });
}

// Load rules when extension is installed/updated
chrome.runtime.onInstalled.addListener(() => {
  loadBlacklistAndBlock();
});

const safeDomains = [   // List of domains that are exempt and considered always safe.
  "www.google.com",
  "google.com",
  "bing.com",
  "yahoo.com" 
];

function isSafeDomain(url) {    // Checks URL against the safe domains
  try {
    const domain = new URL(url).hostname;
    return safeDomains.includes(domain);
  } catch (e) {
    return false;
  }
}

function isUnusual(url) {   // Uses simpel heuristics to help flag domains
  try {
    const { hostname } = new URL(url);

    return (
      hostname.includes("-") ||   // Most legitimate websites will not use hyphens in the domain
      hostname.includes("@") ||   // @ symbol is usually used in phishing websites
      hostname.split(".").length > 3 ||   // Too many sub domains is usually a sign of phishing
      hostname.match(/[0-9]{6,}/)   // Numerical domains
    );
  } catch (e) {
    return false;
  }
}
  
chrome.webNavigation.onCompleted.addListener(async (details) => {   // Listens for page loading
  chrome.storage.local.get('enabled', async (data) => {   // Gets the enabled setting
    if (!data.enabled) { 
      console.log("Extension is disabled — skipping URL check.");
      return;  // Exit if the extension is disabled
    }

    const url = details.url;

    // Only run for top-level frames (not iframes or widgets)
    if (details.frameId !== 0) return;

    console.log("Top-level URL:", url);

    // Skip internal chrome pages like the ones below
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

    // Skip non http/https pages
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return;
    }

    if (isSafeDomain(url)) {
      console.log("Safe domain, skipping...", url);   // If domain is safe dont check
      return;
    }

    // Run heuristic check if extension is enabled
    if (isUnusual(url)) {
      console.log("Suspicious URL detected! Redirecting:", url);    // If URL looks suspicious redirect to warning.html
      chrome.tabs.update(details.tabId, {
        url: chrome.runtime.getURL("warning.html") + `?original=${encodeURIComponent(url)}`
      });
    }
  });
}, {
  url: [{ urlMatches: "http://*/*" }, { urlMatches: "https://*/*" }]
});

  