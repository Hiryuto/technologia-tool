chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.tabs.create({ url: "installed.html" });
    chrome.storage.local.set({ CharacterImg: "Temp" });
    chrome.storage.local.set({ TempImg: "Temp" });
    chrome.storage.local.set({ authorization: "Temp" });
  }
  if (details.reason === "update") {
    chrome.tabs.create({ url: "update.html" });
    //ゲームの変数をChromeの同期ストレージに作成
    //プレイヤーステータスの作成
    chrome.storage.local.set({gameLevel:"1"});
    chrome.storage.local.set({gameExp:"0"});
    chrome.storage.local.set({gemeTotalExp:"0"});
    chrome.storage.local.set({gameHp:"null"});
    chrome.storage.local.set({gameAtk:"null"});
    chrome.storage.local.set({gameDef:"null"});
    chrome.storage.local.set({gameSpd:"null"});
    //システム
    chrome.storage.local.set({gameInv:"null"});
    chrome.storage.local.set({gameGear:"null"});
    chrome.storage.local.set({gameSkill:"null"});
  }
});
