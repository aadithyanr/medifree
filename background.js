function isMediumURL(url) {
  return url.includes('medium.com/');
}

function toFreediumURL(url) {
  return `https://freedium.cfd/${url}`;
}

chrome.webNavigation.onBeforeNavigate.addListener(
  function(details) {
    if (details.frameId !== 0) return;
    
    const url = details.url;
    
    if (isMediumURL(url)) {
      const freediumUrl = toFreediumURL(url);
      
      chrome.tabs.update(details.tabId, {
        url: freediumUrl
      });
    }
  },
  {
    url: [
      { hostContains: 'medium.com' }
    ]
  }
);
