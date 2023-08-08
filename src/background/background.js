// background/background.js
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript(
    {      
      target: {tabId: tab.id},
      files: ['src/content/index.js']
    }
  );
});

chrome.runtime.onMessage.addListener(async function (msg) {
  if (msg.type === "back-from-popup")
  {
    console.log(msg);
    chrome.scripting.executeScript(
    {      
      target: {tabId: msg.tab.id},
      files: ['src/content/index.js']
    });
  }
});
