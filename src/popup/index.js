// popup/index.js

const $ = document.querySelector.bind(document);

const invalidTabStep = function () {
  $(".invalid-tab").style.display = "block";
};

chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
  if (tabs.length !== 1) return;
  
  const url = tabs[0].url;

  chrome.runtime.onMessage.addListener(async function (msg) {
    if (msg.type === "close-popup") {
      window.close();   
    }
  });

  await chrome.runtime.sendMessage({
    type: "back-from-popup",
    tab: tabs[0],
    url: url
  });

  return invalidTabStep();
});

