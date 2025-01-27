import { Piloter } from "./pilotSite/pilot";

// On website.
console.log("Content script injected!");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SEARCH") {
    console.log("Received message:", message.payload);
    const piloter = new Piloter();
    piloter.setField("Armour", 10);
    sendResponse({ reply: "Hello from content script!" });
  }
});
