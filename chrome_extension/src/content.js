import { Piloter } from "./pilotSite/pilot";

// On website.
console.log("Content script injected!");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SEARCH") {
    const itemInfo = message.payload.replaceAll("\r", "");
    console.log("Received message:", itemInfo);
    const piloter = new Piloter();
    piloter.setStatFilters(itemInfo);
    sendResponse({ reply: "Hello from content script!" });
  }
});
