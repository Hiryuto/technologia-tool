chrome.runtime.onInstalled.addListener((details) => {
	if (details.reason === "install") {
		chrome.tabs.create({ url: "installed.html" });
		//初期化
		chrome.storage.local.set({ CharacterImg: "null" });
    	chrome.storage.local.set({ TempImg: "null" });
	}
	if (details.reason === "update") {
		chrome.tabs.create({ url: "update.html" });
		//v1.2.1 release時のみ
		//v1.2.1 以降は以下を削除すること
		chrome.storage.local.set({ CharacterImg: "null" });
		chrome.storage.local.set({ TempImg: "null" });
	}
});
