//変数の宣言
/**
 * ステータスが入る変数です
 * @type {{level: レベル,exp: 経験値,totalExp: 累計経験値,hp: 体力,atk: 攻撃力,def: 防御力,spd: スピード,point:ステータスポイント,coin:コイン,}}
 */
var Status

/**
 * ゲームフラグが管理されている変数です
 * @type {{stage: 最大クリア親ステージ,stageClear: [最大クリアステージ],}}
 */
var flag
/**
 * バトル情報を管理する変数
 * @type {{info:[敵の名前,敵のHP,敵の攻撃力,敵の防御力,敵のスピード,"Fullステージ名",親ステージID,ステージID,最低ドロップ経験値量,最大ドロップ経験値量]}}
 */
var battleinfo = { info: [] }

/**
 * クリティカル率計算式 = [spd]/1.3=[クリ率]
 */

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
    5, 5, 6, 6, 7, 8, 9, 10, 12, 13, 14, 14, 15, 16, 16, 17, 17, 18, 19, 20, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    32, 33, 34, 35, 37, 38, 40, 41, 43, 45, 45, 46, 46, 47, 47, 48, 48, 49, 49, 50, 50, 51, 51, 52, 52, 53, 53, 54, 54,
    55, 55, 56, 56, 57, 57, 58, 59, 59, 60, 60, 61, 62, 62, 63, 64, 64, 65, 65, 66, 67, 67, 68, 69, 69, 70, 71, 72, 72,
    73, 74, 74, 75, 76, 77, 78, 78, 79, 80, 81, 81, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 82, 83, 83, 83, 83, 83,
    83, 83, 83, 83, 83, 83, 83, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 84, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85,
    85, 85, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 87, 88, 88, 88, 88,
    88, 88, 88, 88, 88, 88, 88, 88, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 89, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,
    90, 91, 91, 91, 91, 91, 91, 91, 91, 91, 91, 91, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 93, 93, 93, 93, 93, 93,
    93, 93, 93, 93, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94, 94, 95, 95, 95, 95, 95, 95, 95, 95, 95, 95, 95, 96, 96, 96,
    96, 96, 96, 96, 96, 96, 96, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 99,
    99, 99, 99, 99, 99, 99, 99, 99,
  ],
}

/**
 * ステージを管理する変数
 * @type {{stageName:[ステージの名前],stageID:[ステージのID]}}
 */
var StageIDs = {
  stageName: ['フワマ平原', 'ヤルシヤオ高原'],
  stageID: ['huwama', 'yarusiyao'],
}

//chrome.storageから変数を取得
chrome.storage.local.get([`gamestatus`], function (response) {
  Status = JSON.parse(response.gamestatus)
})
chrome.storage.local.get(['flag'], function (response) {
  flag = JSON.parse(response.flag)
})
//メインページを描画する
async function main() {
  //Chromeのストレージから「ゲームのステータス」を取得する
  chrome.storage.local.get([`gamestatus`], function (response) {
    Status = JSON.parse(response.gamestatus)
  })
  //Chromeのストレージから「フラグ」を取得する
  chrome.storage.local.get(['flag'], function (response) {
    flag = JSON.parse(response.flag)
  })
  await sleep(300)
  //「フラグ」から親ステージ情報を取得して描画する
  switch (flag.stage) {
    case 1:
      stageselect(1)
      break
    case 2:
      stageselect(2)
      break
  }
  //メインページのボタンが押されるとメインページに移動する
  document.getElementById('mainpage').addEventListener('click', () => {
    window.location.href = 'game.html'
  })
  //「ステージ」フワマ平原がクリックされるとhuwamaを実行する
  document.getElementById('huwama').addEventListener('click', () => {
    huwama()
  })
  //「ステージ」ヤルシヤオ高原がクリックされるとyarusiyaoを実行する
  document.getElementById('yarusiyao').addEventListener('click', () => {
    yarusiyao()
  })
}

/* ステージ描画関数 */

/**
 * フワマ平原を描画する
 */
async function huwama() {
  //「フラグ」を再取得する
  chrome.storage.local.get(['flag'], function (response) {
    flag = JSON.parse(response.flag)
  })
  await sleep(300)
  //「フラグ」からステージのクリア情報を取得して描画する
  //stageview([親ステージID],[ステージID])
  switch (flag.stageClear[0]) {
    case 1:
      stageview(1, 1)
      break
    case 2:
      stageview(1, 2)
      break
    case 3:
      stageview(1, 3)
      break
    case 4:
      stageview(1, 4)
      break
    case 5:
      stageview(1, 5)
      break
    case 6:
      stageview(1, 6)
      break
    case 7:
      stageview(1, 7)
      break
    case 8:
      stageview(1, 8)
      break
    case 9:
      stageview(1, 9)
      break
    case 10:
      stageview(1, 10)
      break
  }
  //「クエストページに戻る」が選択された時にクエストページを描画する関数を呼び出す
  document.getElementById('backquest').addEventListener('click', () => {
    main()
  })

  /* 各クエストのボタンが押されるとステータス情報をbattle関数に渡す */

  document.getElementById('huwama1-1').addEventListener('click', () => {
    battleinfo = {
      info: ['スライム', 7, 1, 1, 1, 'フワマ平原 1-1', '1', '1', 1, 2],
    }
    battle(battleinfo)
  })
  document.getElementById('huwama1-2').addEventListener('click', () => {
    battleinfo = {
      info: ['スライム', 10, 1, 1, 1, 'フワマ平原 1-2', '1', '2', 1, 3],
    }
    battle(battleinfo)
  })
  document.getElementById('huwama1-3').addEventListener('click', () => {
    battleinfo = {
      info: ['スライム', 15, 1, 1, 1, 'フワマ平原 1-3', '1', '3', 2, 3],
    }
    battle(battleinfo)
  })
  document.getElementById('huwama1-4').addEventListener('click', () => {
    battleinfo = {
      info: ['スライム', 15, 2, 7, 1, 'フワマ平原 1-4', '1', '4', 1, 4],
    }
    battle(battleinfo)
  })
  document.getElementById('huwama1-5').addEventListener('click', () => {
    battleinfo = {
      info: ['スライム', 20, 4, 7, 1, 'フワマ平原 1-5', '1', '5', 2, 4],
    }
    battle(battleinfo)
  })
  document.getElementById('huwama1-6').addEventListener('click', () => {
    battleinfo = {
      info: ['スライム', 20, 2, 1, 1, 'フワマ平原 1-6', '1', '6', 2, 5],
    }
    battle(battleinfo)
  })
  document.getElementById('huwama1-7').addEventListener('click', () => {
    battleinfo = {
      info: ['スライム', 20, 1, 1, 1, 'フワマ平原 1-7', '1', '7', 2, 6],
    }
    battle(battleinfo)
  })
  document.getElementById('huwama1-8').addEventListener('click', () => {
    battleinfo = {
      info: ['スライム', 20, 1, 1, 1, 'フワマ平原 1-8', '1', '8', 2, 7],
    }
    battle(battleinfo)
  })
  document.getElementById('huwama1-9').addEventListener('click', () => {
    battleinfo = {
      info: ['スライム', 15, 1, 1, 1, 'フワマ平原 1-9', '1', '9', 3, 7],
    }
    battle(battleinfo)
  })
  document.getElementById('huwama1-10').addEventListener('click', () => {
    battleinfo = {
      info: ['スライム', 15, 5, 1, 1, 'フワマ平原 1-10', '1', '10', 4, 10],
    }
    battle(battleinfo)
  })
}

/**
 * ヤルシヤオ高原を描画する
 */

async function yarusiyao() {
  chrome.storage.local.get(['flag'], function (response) {
    flag = JSON.parse(response.flag)
  })
  await sleep(300)
  switch (flag.stageClear[1]) {
    case 1:
      stageview(2, 1)
      break
    case 2:
      stageview(2, 2)
      break
    case 3:
      stageview(2, 3)
      break
    case 4:
      stageview(2, 4)
      break
    case 5:
      stageview(2, 5)
      break
    case 6:
      stageview(2, 6)
      break
    case 7:
      stageview(2, 7)
      break
    case 8:
      stageview(2, 8)
      break
    case 9:
      stageview(2, 9)
      break
    case 10:
      stageview(2, 10)
      break
  }
  document.getElementById('backquest').addEventListener('click', () => {
    main()
  })
  document.getElementById('yarusiyao2-1').addEventListener('click', () => {
    battleinfo = {
      info: ['ギナストワヤ', 20, 3, 14, 1, 'ヤルシヤオ高原 1-1', '2', '1', 5, 7],
    }
    battle(battleinfo)
  })
  document.getElementById('yarusiyao2-2').addEventListener('click', () => {
    battleinfo = {
      info: ['ギナストワヤ', 20, 5, 1, 1, 'ヤルシヤオ高原 1-2', '2', '2', 5, 8],
    }
    battle(battleinfo)
  })
  document.getElementById('yarusiyao2-3').addEventListener('click', () => {
    battleinfo = {
      info: ['ギナストワヤ', 20, 5, 7, 1, 'ヤルシヤオ高原 1-3', '2', '3', 6, 7],
    }
    battle(battleinfo)
  })
  document.getElementById('yarusiyao2-4').addEventListener('click', () => {
    battleinfo = {
      info: ['ギナストワヤ', 15, 2, 21, 1, 'ヤルシヤオ高原 1-4', '2', '4', 6, 8],
    }
    battle(battleinfo)
  })
  document.getElementById('yarusiyao2-5').addEventListener('click', () => {
    battleinfo = {
      info: ['ギナストワヤ', 25, 4, 7, 1, 'ヤルシヤオ高原 1-5', '2', '5', 6, 9],
    }
    battle(battleinfo)
  })
  document.getElementById('yarusiyao2-6').addEventListener('click', () => {
    battleinfo = {
      info: ['ギナストワヤ', 30, 4, 14, 1, 'ヤルシヤオ高原 1-6', '2', '6', 7, 8],
    }
    battle(battleinfo)
  })
  document.getElementById('yarusiyao2-7').addEventListener('click', () => {
    battleinfo = {
      info: ['ギナストワヤ', 35, 3, 7, 1, 'ヤルシヤオ高原 1-7', '2', '7', 7, 9],
    }
    battle(battleinfo)
  })
  document.getElementById('yarusiyao2-8').addEventListener('click', () => {
    battleinfo = {
      info: ['ギナストワヤ', 30, 5, 14, 1, 'ヤルシヤオ高原 1-8', '2', '8', 8, 9],
    }
    battle(battleinfo)
  })
  document.getElementById('yarusiyao2-9').addEventListener('click', () => {
    battleinfo = {
      info: ['ギナストワヤ', 50, 5, 21, 1, 'ヤルシヤオ高原 1-9', '2', '9', 10, 12],
    }
    battle(battleinfo)
  })
  document.getElementById('yarusiyao2-10').addEventListener('click', () => {
    battleinfo = {
      info: ['ギナストワヤ', 15, 5, 1, 1, 'ヤルシヤオ高原 1-10', '2', '10', 5, 12],
    }
    battle(battleinfo)
  })
}

/*初期化 */
setTimeout(() => {
  main()
}, 50)

/*以下関数 */

/**
 * 敵とバトルする
 */
function battle() {
  innerHTML(
    'screen',
    `<h2>敵の情報</h2><h3>${battleinfo.info[0]}</h3><div class="box"><div class="statusbox" style="display: flex;justify-content: center;"><p>HP:${battleinfo.info[1]}</p><p>Atk:${battleinfo.info[2]}</p></div><div class="statusbox" style="display: flex;justify-content: center;"><p>Def:${battleinfo.info[3]}</p><p>Spd:${battleinfo.info[4]}</p></div></div><h2>自分の情報</h2><div class="box"><div class="statusbox" style="display: flex;justify-content: center;"><p>HP:${Status.hp}</p><p>ATK:${Status.atk}</p></div><div class="statusbox" style="display: flex;justify-content: center;"><p>DEF:${Status.def}</p><p>SPD:${Status.spd}</p></div></div></div><button id="start">バトルを開始する</button><hr><button id="backquest">クエストページに戻る</button>`,
  )
  document.getElementById('mainpage').style.display = 'none'
  document.getElementById('hr').style.display = 'none'
  document.getElementById('br').style.display = 'none'
  document.getElementById('backquest').addEventListener('click', () => {
    main()
  })
  document.getElementById('start').addEventListener('click', async function () {
    var nowenemyHp = battleinfo.info[1]
    var nowplayerHp = Status.hp
    var log = ''
    var atk
    var leftexp
    var nowexp
    var levelUp = ''
    var stageMessage = ''
    pageload(nowenemyHp, nowplayerHp, log)
    while (nowenemyHp > 0) {
      if (nowenemyHp < 0) {
        nowenemyHp = 0
      } else if (nowplayerHp < 0) {
        nowplayerHp = 0
      }
      if (nowplayerHp <= 0) {
        break
      }
      await sleep(500)
      var random = Math.floor(Math.random() * (2 + 1 - 1)) + 1
      if (random == 2) {
        atk = Math.ceil(Status.atk / (1 + battleinfo.info[3] / 100))
        nowenemyHp -= atk
        log += `\n${battleinfo.info[0]}に${atk}ダメージを与えた！`
      } else if (random == 1) {
        atk = Math.ceil(battleinfo.info[2] / (1 + Status.def / 100))
        nowplayerHp -= atk
        log += `\n${battleinfo.info[0]}から${atk}ダメージを受けた！`
      }
      if (nowenemyHp < 0) {
        nowenemyHp = 0
      } else if (nowplayerHp < 0) {
        nowplayerHp = 0
      }
      pageload(nowenemyHp, nowplayerHp, log)
    }
    if (nowenemyHp == 0) {
      log += `\n戦闘に勝利した！`
      pageload(nowenemyHp, nowplayerHp, log)
      await sleep(2000)
      var ExpRandom = Math.floor(Math.random() * (battleinfo.info[9] + 1 - battleinfo.info[8])) + battleinfo.info[8]
      Status.exp += ExpRandom
      Status.totalExp += ExpRandom
      if (levelTable.level[Status.level - 1] <= Status.exp) {
        Status.exp -= levelTable.level[Status.level - 1]
        Status.level++
        Status.point++
        setstatus = JSON.stringify(Status)
        chrome.storage.local.set({
          gamestatus: setstatus,
        })
        levelUp = `レベルUp!! ${Status.level - 1}→${Status.level}`
      }
      nowexp = Status.exp
      leftexp = levelTable.level[Status.level - 1] - nowexp
      setstatus = JSON.stringify(Status)
      console.log(battleinfo)
      if (flag.stageClear[battleinfo.info[6] - 1] == battleinfo.info[7]) {
        if (flag.stageClear[battleinfo.info[6] - 1] == 10 && flag.stage == battleinfo.info[6]) {
          flag.stage++
          stageMessage = '新たなステージが開放されました！'
        } else if (flag.stageClear[battleinfo.info[6] - 1] !== 10 && flag.stage !== battleinfo.info[6]) {
          flag.stageClear[battleinfo.info[6] - 1]++
        }
      }
      flags = JSON.stringify(flag)
      chrome.storage.local.set({
        flag: flags,
      })
      chrome.storage.local.set({
        gamestatus: setstatus,
      })
      console.log(flag)
      innerHTML(
        'screen',
        `<h1>勝利！</h1><h2>${stageMessage}</h2><h2>${levelUp}</h2><h2>Exp:${ExpRandom}</h2><h2>次のレベルまであと${leftexp}exp</h2><hr><button id="backquest">クエストページに戻る</button>`,
      )
      document.getElementById('mainpage').style.display = 'inline-block'
      document.getElementById('br').style.display = 'block'
    } else if (nowplayerHp == 0) {
      log += `\n戦闘に負けてしまった...`
      pageload(nowenemyHp, nowplayerHp, log)
      await sleep(2000)
      innerHTML(
        'screen',
        `<h1>敗北...</h1><button id="retry">再挑戦</button><hr><button id="backquest">クエストページに戻る</button>`,
      )
      document.getElementById('mainpage').style.display = 'inline-block'
      document.getElementById('br').style.display = 'block'
    }
    document.getElementById('backquest').addEventListener('click', () => {
      return main()
    })
    document.getElementById('retry').addEventListener('click', () => {
      return battle()
    })
  })
}

/**
 * @param {string} id HTMLのID
 * @param {string} message 変換したい文字列を指定
 */
function textContent(id, message) {
  document.getElementById(id).textContent = `${message}`
}
/**
 * @param {string} id HTMLのID
 * @param {string} message 変換したいHTMLを指定
 */
function innerHTML(id, message) {
  document.getElementById(id).innerHTML = `${message}`
}

/**
 * 待機 ※await必須
 * @param {待つ時間} waitTime
 * @returns
 */
const sleep = (waitTime) => new Promise((resolve) => setTimeout(resolve, waitTime))

/**
 * 画面を更新する関数
 * @param {今の敵のHP} nowenemyHp
 * @param {今の自分のHP} nowplayerHp
 * @param {log} log
 */
function pageload(nowenemyHp, nowplayerHp, log) {
  console.log(nowenemyHp)
  innerHTML(
    'screen',
    `<h1>${battleinfo.info[5]}</h1><h2>敵の状態</h2><h3 style="margin-bottom: 0px;">${battleinfo.info[0]}</h3><h4>HP</h4><h5 style="margin:0px 0px">${nowenemyHp}/${battleinfo.info[1]}</h5><progress style="height: 20px;" value="${nowenemyHp}" max="${battleinfo.info[1]}">HP</progress><hr><h2>自分の情報</h2><h4>HP</h4><h5 style="margin:0px 0px">${nowplayerHp}/${Status.hp}</h5><progress style="height: 20px;" value="${nowplayerHp}" max="${Status.hp}">HP</progress><hr><h4>バトルログ</h4><textarea id="log" rows="4" cols="40" style="overflow:hidden;resize: none;" disabled>${log}</textarea>`,
  )
  document.getElementById('log').scrollTop = document.getElementById('log').scrollHeight
}

/**
 * 親ステージを選択する際に必要なものを描画する関数
 * @param {最大クリア親ステージ} stageNumber
 */
function stageselect(stageNumber) {
  stageNumber += 1
  var button = ``
  for (var i = 1; stageNumber > i; i++) {
    var id = i - 1
    console.log(StageIDs.stageID[id])
    button =
      `<button id="${StageIDs.stageID[id]}"style="margin-bottom: 5px;">${StageIDs.stageName[id]}</button><br>` + button
  }
  innerHTML('screen', `<h2>ステージを選択してください</h2>${button}`)
  document.getElementById('mainpage').style.display = 'inline-block'
  document.getElementById('hr').style.display = 'block'
  document.getElementById('br').style.display = 'none'
}
/**
 * ステージを表示する関数
 * @param {親ステージID} stageid
 * @param {ステージID} stageNumber
 */
function stageview(stageid, stageNumber) {
  var stageiD = stageid - 1
  var stageID = StageIDs.stageID[stageiD]
  var stageName = StageIDs.stageName[stageiD]
  stageNumber += 1
  var button = `<button id="${stageID}${stageid}-1"style="margin-bottom: 5px;">${stageName} ${stageid}-1</button>`
  for (var i = 2; stageNumber > i; i++) {
    button =
      `<button id="${stageID}${stageid}-${i}"style="margin-bottom: 5px;">${stageName} ${stageid}-${i}</button><br>` +
      button
  }
  innerHTML(
    'screen',
    '<h2>ステージを選択してください</h2>' + button + `<hr><button id="backquest">クエストページに戻る</button>`,
  )
  document.getElementById('mainpage').style.display = 'none'
  document.getElementById('hr').style.display = 'none'
  document.getElementById('br').style.display = 'none'
}
