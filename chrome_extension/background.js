// In chrome extension service worker.

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed!");
});

// Won't be triggered because routed to popup instead.
chrome.action.onClicked.addListener((tab) => {
  console.log("Action button clicked!");
});
