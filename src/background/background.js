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

chrome.runtime.onMessage.addListener(async function (msg) {
  if (msg.type === "open-video-popup") {
    
    const w = await chrome.windows.create({
      url: 'src/popup/video.html?title=' + encodeURI(msg.title)
        + '&v=' + msg.v,
      type: 'popup', width: msg.width, height: msg.height,
    });

  }
});  