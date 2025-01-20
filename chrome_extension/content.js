// On website.
console.log("Content script injected!"); 

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SEARCH") {
    console.log("Received message:", message.payload);
    sendResponse({ reply: "Hello from content script!" });
  }
});
