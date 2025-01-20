// In popup.

const searchClipboard = async () => {
  const tabs = await new Promise((resolve, reject) => {
    const queryTarget = { active: true, currentWindow: true };
    chrome.tabs.query(queryTarget, (tabs) => resolve(tabs));
  });

  const itemInfo = await navigator.clipboard.readText();
  const message = { type: "SEARCH", payload: itemInfo };
  const tabId = tabs[0].id;
  chrome.tabs.sendMessage(tabId, message, (response) => {
    console.log("Response:", response);
  });
}

document.getElementById("search").addEventListener("click", searchClipboard);

