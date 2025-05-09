chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.includes('economist.com')) {
        console.log('Tab updated: status complete, url: ', tab.url);
        // Check if we need to auto-login
        chrome.storage.sync.get(['economist_autologin'], function (data) {
            if (data.economist_autologin) {
                console.log('Sending message to performLogin');
                chrome.tabs.sendMessage(tabId, { action: "performLogin" });
            }
        });
    }
});
