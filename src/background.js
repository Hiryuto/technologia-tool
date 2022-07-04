chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.tabs.create({ url: "installed.html" });
    //初期化
    chrome.storage.local.set({ CharacterImg: "" });
    chrome.storage.local.set({ TempImg: "" });
    chrome.storage.local.set({ authorization: "" });
  }
  if (details.reason === "update") {
    chrome.tabs.create({ url: "update.html" });
  }
});
