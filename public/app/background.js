/*global chrome*/

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.action === "updateIcon") {
    console.log("FUCK", msg);
    if (msg.value) {
      chrome.browserAction.setIcon({ path: "/assets/tick.png" });
    } else {
      chrome.browserAction.setIcon({ path: "/assets/cross.png" });
    }
  }
});

// chrome.webNavigation.onCommitted.addListener(updateIcon);
// chrome.webNavigation.onHistoryStateUpdated.addListener(updateIcon);
// chrome.webNavigation.onBeforeNavigate.addListener(updateIcon);

// function updateIcon(details) {
//   if (details.frameId !== 0) {
//     return; // only update the icon for main page, not iframe/frame
//   }
//   chrome.browserAction.setIcon({
//     path: { 19: "france-19.png", 38: "france-38.png" },
//     tabId: details.tabId,
//   });
// }
