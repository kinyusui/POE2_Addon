import { Piloter } from "./pilotSite/pilot";

// On website.
console.log("Content script injected!");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SEARCH") {
    const itemInfo = message.payload.replaceAll("\r", "");
    //     const itemInfo = `Item Class: Rings
    // Rarity: Rare
    // Gale Hold
    // Ruby Ring
    // --------
    // Requirements:
    // Level: 51
    // --------
    // Item Level: 73
    // --------
    // +21% to Fire Resistance (implicit)
    // --------
    // Adds 3 to 44 Lightning damage to Attacks
    // +208 to Accuracy Rating
    // +93 to maximum Mana
    // 22% increased Rarity of Items found
    // +17% to Fire Resistance
    // +26% to Lightning Resistance`;
    console.log("Received message:", itemInfo);
    const piloter = new Piloter();
    piloter.setStatFilters(itemInfo);
    sendResponse({ reply: "Hello from content script!" });
  }
});
