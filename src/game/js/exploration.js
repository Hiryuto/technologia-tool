//変数の宣言
/**
 * ステータスが入る変数です
 * @type {{level: レベル,exp: 経験値,totalExp: 累計経験値,hp: 体力,atk: 攻撃力,def: 防御力,spd: スピード,point:ステータスポイント,coin:コイン,}}
 */
var Status;

/**
 * ゲームフラグが管理されている変数です
 * @type {{stage:最大クリアステージ,stage1:ステージ1での最大クリアステージ}}
 */
var flag;
//chrome.storageから変数を取得
chrome.storage.local.get([`gamestatus`], function (response) {
  Status = JSON.parse(response.gamestatus);
});
chrome.storage.local.get(["flag"], function (response) {
  flag = JSON.parse(response.flag);
});
//メインページ
function main() {
  switch (flag.stage) {
    case 1:
      innerHTML(
        "screen",
        '<h2>ステージを選択してください</h2><button id="huwama"style="margin-bottom: 5px;">フワマ平原</button>'
      );
      document.getElementById("mainpage").style.display = "inline-block";
      document.getElementById("hr").style.display = "block";
      break;
    case 2:
      innerHTML(
        "screen",
        '<h2>ステージを選択してください</h2><button id="huwama"style="margin-bottom: 5px;">フワマ平原</button><br><button id="yarusiyao"style="margin-bottom: 5px;">ヤルシヤオ高原</button>'
      );
      document.getElementById("mainpage").style.display = "inline-block";
      document.getElementById("hr").style.display = "block";
      break;
  }
  document.getElementById("mainpage").addEventListener("click", () => {
    window.location.href = "game.html";
  });
  document.getElementById("huwama").addEventListener("click", () => {
    huwama();
  });
  document.getElementById("yarusiyao").addEventListener("click", () => {
    window.location.href = "game.html";
  });
}
//ステージ選択後
function huwama() {
  switch (flag.stage1) {
    case 1:
      innerHTML(
        "screen",
        '<h2>ステージを選択してください</h2><button id="huwama1-1"style="margin-bottom: 5px;">フワマ平原 1-1</button>'
      );
      document.getElementById("mainpage").style.display = "inline-block";
      document.getElementById("hr").style.display = "block";
      break;
  }
  document.getElementById("huwama1-1").addEventListener("click", () => {
    battle("スライム", 10, 1, 1, 1, "フワマ平原 1-1", "huwama", "1-1");
  });
}

//バトル
/**
 * 敵とバトルする
 * @param {敵の名前} enemyName
 * @param {敵のHP} enemyHp
 * @param {敵の攻撃力} enemyAtk
 * @param {敵の防御力} enemyDef
 * @param {敵のスピード} enemySpd
 * @param {ステージ名} stageName
 * @param {ステージ名ローマ字} stageids
 * @param {ステージID} stageid
 */
function battle(
  enemyName,
  enemyHp,
  enemyAtk,
  enemyDef,
  enemySpd,
  stageName,
  stageids,
  stageid
) {
  innerHTML(
    "screen",
    `<h2>敵の情報</h2><h3>${enemyName}</h3><div class="box"><div class="statusbox" style="display: flex;justify-content: center;"><p>HP:${enemyHp}</p><p>Atk:${enemyAtk}</p></div><div class="statusbox" style="display: flex;justify-content: center;"><p>Def:${enemyDef}</p><p>Spd:${enemySpd}</p></div></div><h2>自分の情報</h2><div class="box"><div class="statusbox" style="display: flex;justify-content: center;"><p>HP:${Status.hp}</p><p>ATK:${Status.atk}</p></div><div class="statusbox" style="display: flex;justify-content: center;"><p>DEF:${Status.def}</p><p>SPD:${Status.spd}</p></div></div></div>`
  );
  document.getElementById("mainpage").style.display = "none";
  document.getElementById("hr").style.display = "none";
}

/**
 * @param {string} id HTMLのID
 * @param {string} message 変換したい文字列を指定
 */
function textContent(id, message) {
  document.getElementById(id).textContent = `${message}`;
}

/**
 * @param {string} id HTMLのID
 * @param {string} message 変換したいHTMLを指定
 */
function innerHTML(id, message) {
  document.getElementById(id).innerHTML = `${message}`;
}

//以下初期化
setTimeout(() => {
  main();
}, 50);
