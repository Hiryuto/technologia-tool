//変数の宣言
/**
 * ステータスが入る変数です
 * @type {{level: レベル,exp: 経験値,totalExp: 累計経験値,hp: 体力,atk: 攻撃力,def: 防御力,spd: スピード,point:ステータスポイント,coin:コイン,}}
 */
var Status;

/**
 * ゲームフラグが管理されている変数です
 * @type {json}
 */
var flag;

/*
import math
level = 1
exp=5
explevel=0
lists=str(exp)
explist=[]
levellist=[]
while level <= 99:
    lists =lists+","+str(round(exp))
    level += 1
    explist.append(round(exp))
    levellist.append(round(level))
    exp= exp*1.03
while level <= 149:
    lists =lists+","+str(round(exp))
    level += 1
    explist.append(round(exp))
    levellist.append(round(level))
    exp= exp*1.02
import matplotlib.pyplot as plt
print(lists)

plt.plot(levellist, explist);
print(level)
*/
var levelTable = {
  level: [
    5, 5, 6, 6, 7, 8, 9, 10, 12, 13, 14, 14, 15, 16, 16, 17, 17, 18, 19, 20, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 33, 34, 35, 37, 38, 40, 41, 43,
    45, 45, 46, 46, 47, 47, 48, 48, 49, 49, 50, 50, 51, 51, 52, 52, 53, 53, 54,
    54, 55, 55, 56, 56, 57, 57, 58, 59, 59, 60, 60, 61, 62, 62, 63, 64, 64, 65,
    65, 66, 67, 67, 68, 69, 69, 70, 71, 72, 72, 73, 74, 74, 75, 76, 77, 78, 78,
    79, 80, 81, 81, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 83, 83, 83,
    83, 83, 83, 83, 83, 83, 83, 83, 83, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84,
    84, 84, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 86, 86, 86, 86, 86,
    86, 86, 86, 86, 86, 86, 86, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 88,
    88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 88, 89, 89, 89, 89, 89, 89, 89, 89,
    89, 89, 89, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 91, 91, 91, 91, 91,
    91, 91, 91, 91, 91, 91, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 93, 93,
    93, 93, 93, 93, 93, 93, 93, 93, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94,
    95, 95, 95, 95, 95, 95, 95, 95, 95, 95, 95, 96, 96, 96, 96, 96, 96, 96, 96,
    96, 96, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 98, 98, 98, 98, 98, 98, 98,
    98, 98, 98, 98, 99, 99, 99, 99, 99, 99, 99, 99, 99,
  ],
};

//stageID
var StageIDs = {
  stageName: ["フワマ平原", "ヤルシヤオ高原"],
  stageID: ["huwama", "yarusiyao"],
};

//chrome.storageから変数を取得
chrome.storage.local.get([`gamestatus`], function (response) {
  Status = JSON.parse(response.gamestatus);
});
chrome.storage.local.get(["flag"], function (response) {
  flag = JSON.parse(response.flag);
});
//メインページ
async function main() {
  chrome.storage.local.get([`gamestatus`], function (response) {
    Status = JSON.parse(response.gamestatus);
  });
  chrome.storage.local.get(["flag"], function (response) {
    flag = JSON.parse(response.flag);
  });
  await sleep(300);
  switch (flag.stage) {
    case 1:
      stageselect(1);
      break;
    case 2:
      stageselect(2);
      break;
  }
  document.getElementById("mainpage").addEventListener("click", () => {
    window.location.href = "game.html";
  });
  document.getElementById("huwama").addEventListener("click", () => {
    huwama();
  });
  document.getElementById("yarusiyao").addEventListener("click", () => {
    yarusiyao();
  });
}
//ステージ選択後
async function huwama() {
  chrome.storage.local.get(["flag"], function (response) {
    flag = JSON.parse(response.flag);
  });
  await sleep(300);
  switch (flag.stageClear[0]) {
    case 1:
      stageview(1, 1);
      break;
    case 2:
      stageview(1, 2);
      break;
    case 3:
      stageview(1, 3);
      break;
    case 4:
      stageview(1, 4);
      break;
    case 5:
      stageview(1, 5);
      break;
    case 6:
      stageview(1, 6);
      break;
    case 7:
      stageview(1, 7);
      break;
    case 8:
      stageview(1, 8);
      break;
    case 9:
      stageview(1, 9);
      break;
    case 10:
      stageview(1, 10);
      break;
  }
  document.getElementById("backpage").addEventListener("click", () => {
    main();
  });
  document.getElementById("huwama1-1").addEventListener("click", () => {
    battle("スライム", 7, 1, 1, 1, "フワマ平原 1-1", "1", "1", 1, 2);
  });
  document.getElementById("huwama1-2").addEventListener("click", () => {
    battle("スライム", 10, 1, 1, 1, "フワマ平原 1-2", "1", "2", 1, 3);
  });
  document.getElementById("huwama1-3").addEventListener("click", () => {
    battle("スライム", 15, 1, 1, 1, "フワマ平原 1-3", "1", "3", 2, 3);
  });
  document.getElementById("huwama1-4").addEventListener("click", () => {
    battle("スライム", 15, 2, 7, 1, "フワマ平原 1-4", "1", "4", 1, 4);
  });
  document.getElementById("huwama1-5").addEventListener("click", () => {
    battle("スライム", 20, 4, 7, 1, "フワマ平原 1-5", "1", "5", 2, 4);
  });
  document.getElementById("huwama1-6").addEventListener("click", () => {
    battle("スライム", 20, 2, 1, 1, "フワマ平原 1-6", "1", "6", 2, 5);
  });
  document.getElementById("huwama1-7").addEventListener("click", () => {
    battle("スライム", 20, 1, 1, 1, "フワマ平原 1-7", "1", "7", 2, 6);
  });
  document.getElementById("huwama1-8").addEventListener("click", () => {
    battle("スライム", 20, 1, 1, 1, "フワマ平原 1-8", "1", "8", 2, 7);
  });
  document.getElementById("huwama1-9").addEventListener("click", () => {
    battle("スライム", 15, 1, 1, 1, "フワマ平原 1-9", "1", "9", 3, 7);
  });
  document.getElementById("huwama1-10").addEventListener("click", () => {
    battle("スライム", 15, 5, 1, 1, "フワマ平原 1-10", "1", "10", 4, 10);
  });
}

async function yarusiyao() {
  chrome.storage.local.get(["flag"], function (response) {
    flag = JSON.parse(response.flag);
  });
  await sleep(300);
  switch (flag.stageClear[1]) {
    case 1:
      stageview(2, 1);
      break;
    case 2:
      stageview(2, 2);
      break;
    case 3:
      stageview(2, 3);
      break;
    case 4:
      stageview(2, 4);
      break;
    case 5:
      stageview(2, 5);
      break;
    case 6:
      stageview(2, 6);
      break;
    case 7:
      stageview(2, 7);
      break;
    case 8:
      stageview(2, 8);
      break;
    case 9:
      stageview(2, 9);
      break;
    case 10:
      stageview(2, 10);
      break;
  }
  document.getElementById("backpage").addEventListener("click", () => {
    main();
  });
  document.getElementById("yarusiyao2-1").addEventListener("click", () => {
    battle("ギナストワヤ", 20, 3, 14, 1, "ヤルシヤオ高原 1-1", "1", "1", 5, 7);
  });
  document.getElementById("yarusiyao2-2").addEventListener("click", () => {
    battle("ギナストワヤ", 20, 5, 1, 1, "ヤルシヤオ高原 1-2", "1", "2", 5, 8);
  });
  document.getElementById("yarusiyao2-3").addEventListener("click", () => {
    battle("ギナストワヤ", 20, 5, 7, 1, "ヤルシヤオ高原 1-3", "1", "3", 6, 7);
  });
  document.getElementById("yarusiyao2-4").addEventListener("click", () => {
    battle("ギナストワヤ", 15, 2, 21, 1, "ヤルシヤオ高原 1-4", "1", "4", 6, 8);
  });
  document.getElementById("yarusiyao2-5").addEventListener("click", () => {
    battle("ギナストワヤ", 25, 4, 7, 1, "ヤルシヤオ高原 1-5", "1", "5", 6, 9);
  });
  document.getElementById("yarusiyao2-6").addEventListener("click", () => {
    battle("ギナストワヤ", 30, 4, 14, 1, "ヤルシヤオ高原 1-6", "1", "6", 7, 8);
  });
  document.getElementById("yarusiyao2-7").addEventListener("click", () => {
    battle("ギナストワヤ", 35, 3, 7, 1, "ヤルシヤオ高原 1-7", "1", "7", 7, 9);
  });
  document.getElementById("yarusiyao2-8").addEventListener("click", () => {
    battle("ギナストワヤ", 30, 5, 14, 1, "ヤルシヤオ高原 1-8", "1", "8", 8, 9);
  });
  document.getElementById("yarusiyao2-9").addEventListener("click", () => {
    battle(
      "ギナストワヤ",
      50,
      5,
      21,
      1,
      "ヤルシヤオ高原 1-9",
      "1",
      "9",
      10,
      12
    );
  });
  document.getElementById("yarusiyao2-10").addEventListener("click", () => {
    battle(
      "ギナストワヤ",
      15,
      5,
      1,
      1,
      "ヤルシヤオ高原 1-10",
      "1",
      "10",
      5,
      12
    );
  });
}

/*初期化 */
setTimeout(() => {
  main();
}, 50);

/*以下関数 */

/**
 * 敵とバトルする
 * @param {敵の名前} enemyName
 * @param {敵のHP} enemyHp
 * @param {敵の攻撃力} enemyAtk
 * @param {敵の防御力} enemyDef
 * @param {敵のスピード} enemySpd
 * @param {ステージ名} stageName
 * @param {内部ステージID} stageids
 * @param {ステージID} stageid
 * @param {経験値の最低} expmin
 * @param {経験値の最大} expmax
 */
function battle(
  enemyName,
  enemyHp,
  enemyAtk,
  enemyDef,
  enemySpd,
  stageName,
  stageids,
  stageid,
  expmin,
  expmax
) {
  innerHTML(
    "screen",
    `<h2>敵の情報</h2><h3>${enemyName}</h3><div class="box"><div class="statusbox" style="display: flex;justify-content: center;"><p>HP:${enemyHp}</p><p>Atk:${enemyAtk}</p></div><div class="statusbox" style="display: flex;justify-content: center;"><p>Def:${enemyDef}</p><p>Spd:${enemySpd}</p></div></div><h2>自分の情報</h2><div class="box"><div class="statusbox" style="display: flex;justify-content: center;"><p>HP:${Status.hp}</p><p>ATK:${Status.atk}</p></div><div class="statusbox" style="display: flex;justify-content: center;"><p>DEF:${Status.def}</p><p>SPD:${Status.spd}</p></div></div></div><button id="start">バトルを開始する</button><hr><button id="backpage">クエストページに戻る</button>`
  );
  document.getElementById("mainpage").style.display = "none";
  document.getElementById("hr").style.display = "none";
  document.getElementById("br").style.display = "none";
  document.getElementById("backpage").addEventListener("click", () => {
    main();
  });
  document.getElementById("start").addEventListener("click", async function () {
    var nowenemyHp = enemyHp;
    var nowplayerHp = Status.hp;
    var log = "";
    var atk;
    var leftexp;
    var nowexp;
    var levelUp = "";
    var stageMessage = "";

    pageload(stageName, enemyName, enemyHp, nowenemyHp, nowplayerHp, log);
    while (nowenemyHp > 0) {
      if (nowenemyHp < 0) {
        nowenemyHp = 0;
      } else if (nowplayerHp < 0) {
        nowplayerHp = 0;
      }
      if (nowplayerHp <= 0) {
        break;
      }
      await sleep(500);
      var random = Math.floor(Math.random() * (2 + 1 - 1)) + 1;
      if (random == 2) {
        atk = Math.ceil(Status.atk / (1 + enemyDef / 10));
        nowenemyHp -= atk;
        log += `\n${enemyName}に${atk}ダメージを与えた！`;
      } else if (random == 1) {
        atk = Math.ceil(enemyAtk / (1 + Status.def / 10));
        nowplayerHp -= atk;
        log += `\n${enemyName}から${atk}ダメージを受けた！`;
      }
      if (nowenemyHp < 0) {
        nowenemyHp = 0;
      } else if (nowplayerHp < 0) {
        nowplayerHp = 0;
      }
      pageload(stageName, enemyName, enemyHp, nowenemyHp, nowplayerHp, log);
    }
    if (nowenemyHp == 0) {
      log += `\n戦闘に勝利した！`;
      pageload(stageName, enemyName, enemyHp, nowenemyHp, nowplayerHp, log);
      await sleep(2000);
      var ExpRandom =
        Math.floor(Math.random() * (expmax + 1 - expmin)) + expmin;
      Status.exp += ExpRandom;
      Status.totalExp += ExpRandom;
      if (levelTable.level[Status.level - 1] <= Status.exp) {
        Status.exp -= levelTable.level[Status.level - 1];
        Status.level++;
        Status.point++;
        setstatus = JSON.stringify(Status);
        chrome.storage.local.set({
          gamestatus: setstatus,
        });
        levelUp = `レベルUp!! ${Status.level - 1}→${Status.level}`;
      }
      nowexp = Status.exp;
      leftexp = levelTable.level[Status.level - 1] - nowexp;
      setstatus = JSON.stringify(Status);
      if (flag.stageClear[stageids - 1] == stageid) {
        if (flag.stageClear[stageids - 1] == 10 && flag.stage == stageids) {
          flag.stage++;
          stageMessage = "新たなステージが開放されました！";
        } else if (
          flag.stageClear[stageids - 1] !== 10 &&
          flag.stage !== stageids
        ) {
          flag.stageClear[stageids - 1]++;
        }
      }
      flags = JSON.stringify(flag);
      chrome.storage.local.set({
        flag: flags,
      });
      chrome.storage.local.set({
        gamestatus: setstatus,
      });
      innerHTML(
        "screen",
        `<h1>勝利！</h1><h2>${stageMessage}</h2><h2>${levelUp}</h2><h2>Exp:${ExpRandom}</h2><h2>次のレベルまであと${leftexp}exp</h2><hr><button id="backpage">クエストページに戻る</button>`
      );
      document.getElementById("mainpage").style.display = "inline-block";
      document.getElementById("br").style.display = "block";
    } else if (nowplayerHp == 0) {
      log += `\n戦闘に負けてしまった...`;
      pageload(stageName, enemyName, enemyHp, nowenemyHp, nowplayerHp, log);
      await sleep(2000);
      innerHTML(
        "screen",
        `<h1>敗北...</h1><hr><button id="backpage">クエストページに戻る</button>`
      );
      document.getElementById("mainpage").style.display = "inline-block";
      document.getElementById("br").style.display = "block";
    }
    document.getElementById("backpage").addEventListener("click", () => {
      main();
    });
  });
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

/**
 * 待機 ※await必須
 * @param {待つ時間} waitTime
 * @returns
 */
const sleep = (waitTime) =>
  new Promise((resolve) => setTimeout(resolve, waitTime));

/**
 * 画面を更新する関数
 * @param {stage名} stageName
 * @param {敵の名前} enemyName
 * @param {敵のHP} enemyHp
 * @param {今の敵のHP} nowenemyHp
 * @param {今の自分のHP} nowplayerHp
 * @param {log} log
 */
function pageload(stageName, enemyName, enemyHp, nowenemyHp, nowplayerHp, log) {
  innerHTML(
    "screen",
    `<h1>${stageName}</h1><h2>敵の状態</h2><h3 style="margin-bottom: 0px;">${enemyName}</h3><h4>HP</h4><h5 style="margin:0px 0px">${nowenemyHp}/${enemyHp}</h5><progress style="height: 20px;" value="${nowenemyHp}" max="${enemyHp}">HP</progress><hr><h2>自分の情報</h2><h4>HP</h4><h5 style="margin:0px 0px">${nowplayerHp}/${Status.hp}</h5><progress style="height: 20px;" value="${nowplayerHp}" max="${Status.hp}">HP</progress><hr><h4>バトルログ</h4><textarea id="log" rows="4" cols="40" style="overflow:hidden;resize: none;" disabled>${log}</textarea>`
  );
  document.getElementById("log").scrollTop =
    document.getElementById("log").scrollHeight;
}

/**
 * ステージセレクトの際に必要なものを描画する関数
 */
function stageselect(stageNumber) {
  stageNumber += 1;
  var button = ``;
  for (var i = 1; stageNumber > i; i++) {
    var id = i - 1;
    console.log(StageIDs.stageID[id]);
    button =
      `<button id="${StageIDs.stageID[id]}"style="margin-bottom: 5px;">${StageIDs.stageName[id]}</button><br>` +
      button;
  }
  innerHTML("screen", `<h2>ステージを選択してください</h2>${button}`);
  document.getElementById("mainpage").style.display = "inline-block";
  document.getElementById("hr").style.display = "block";
  document.getElementById("br").style.display = "none";
}

function stageview(stageid, stageNumber) {
  var stageiD = stageid - 1;
  var stageID = StageIDs.stageID[stageiD];
  var stageName = StageIDs.stageName[stageiD];
  stageNumber += 1;
  console.log(`${stageID}${stageid}-1`);
  var button = `<button id="${stageID}${stageid}-1"style="margin-bottom: 5px;">${stageName} ${stageid}-1</button>`;
  for (var i = 2; stageNumber > i; i++) {
    button =
      `<button id="${stageID}${stageid}-${i}"style="margin-bottom: 5px;">${stageName} ${stageid}-${i}</button><br>` +
      button;
  }
  innerHTML(
    "screen",
    "<h2>ステージを選択してください</h2>" +
      button +
      `<hr><button id="backpage">クエストページに戻る</button>`
  );
  document.getElementById("mainpage").style.display = "none";
  document.getElementById("hr").style.display = "none";
  document.getElementById("br").style.display = "none";
}
