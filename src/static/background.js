(() => {
  "use strict";

  

  // chrome.runtime.onInstalled.addListener(function(t) {
  //   "install" === t.reason &&
  //     chrome.tabs.create({ url: "https://salesforce.com" });
  // });
  chrome.runtime.onInstalled.addListener(() => {
    chrome.action.disable();
  
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
      const rules = {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostSuffix: ".force.com", schemes: ["https"] },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowAction()],
      };
  
      chrome.declarativeContent.onPageChanged.addRules([rules]);
    });
  });


  chrome.action.onClicked.addListener(function(t) {

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const currentTab = tabs[0];
      const currentUrl = currentTab.url;

  
      // Use the currentUrl as needed
      console.log('Current URL:', currentUrl);

      const updatedUrl = currentUrl.replace(/lightning\.force\.com/, 'my.salesforce.com');

      console.log('Updated URL:', updatedUrl);
      
      const e = chrome.runtime.getURL("index.html?url="+updatedUrl);
      chrome.tabs.create({ url: e });
    });

      

          
      

    });
    

  
  


})();
