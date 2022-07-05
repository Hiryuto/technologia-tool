chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.tabs.create({ url: "installed.html" });
    chrome.storage.local.set({ CharacterImg: "Temp" });
    chrome.storage.local.set({ TempImg: "Temp" });
    chrome.storage.local.set({ authorization: "Temp" });
  }
  if (details.reason === "update") {
    chrome.tabs.create({ url: "update.html" });
  }
});
