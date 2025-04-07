// Phishing blacklist
let blacklist = [];

fetch(chrome.runtime.getURL('blacklist.txt'))       // Fetches data from blacklist.txt
    .then(response => response.text())      // Turns contents of blacklist.txt into plain text
    .then(text => {
        blacklist = text.split('\n').map(domain => domain.trim()); // Splits the text into arrays and splits at every new line and removes any empty spaces.
    })
   

// Simple heuristic functions
function isSuspicious(url) {
    return (
        url.includes("@") ||        // @ symbol is common in phishing URLs
        url.includes("-") ||        // Hyphenated URLs are not common and may be a sign of a phishing URL
        url.split(".").length > 3 ||        // Urls split with more than 3 .'s are usually suspicious links
        url.match(/[0-9]{6,}/)      // Looks out for numeric domains
    );
}

// Monitor web requests
chrome.webRequest.onBeforeRequest.addListener(      // Function is ran everytime before a web page is loaded to check if its safe
    function (details) {        // Function gets details about the web request
        const url = new URL(details.url);       // Breaks up the URL
        const domain = url.hostname;        // Breaks up the URL

        if (blacklist.includes(domain) || isSuspicious(url.href)) {         // If blacklist.txt includes the domain or if the heuristic functions deem this suspicious
            // Block page and show warning
            return {redirectUrl: chrome.runtime.getURL("warning.html")};        // Redirects user to a warning page if domain is suspicious
        }
    },
    { urls: ["<all_urls>"] },       // Ensures this code is ran for every website
    ["blocking"]        // Pause request until it is blocked or allowed
)