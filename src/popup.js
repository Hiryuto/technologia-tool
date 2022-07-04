chrome.storage.local.get(["authorization"], async function (result) {
  authorization = result.authorization;
  if (authorization == undefined) {
    return (document.getElementById("status").innerHTML =
      "<h1>認証コードが設定されていません。</h1>");
  }
  textContent("load", "読み込み中");
  var request = await fetch(
    "https://register.technologia-schoolofmagic.jp/api/players",
    {
      method: "GET",
      //   modes: "cors",
      headers: {
        authorization: `${authorization}`,
      },
    }
  );
  var data = await request.json();
  console.log(request.status);
  if (request.status !== 200) {
    return innerHTML(
      "status",
      `<h1>正常に取得できませんでした。</h1><h1>ステータスコード:${request.status}</h1>`
    );
  }
  var last_time_iso = new Date(data.lesson_progress.play_days.last_time);
  var last_time = last_time_iso.toLocaleString();
  textContent("load", "");
  textContent("level", data.statuses.designation.rank);
  textContent("label", data.statuses.designation.label);
  document.getElementById("last_time").textContent = `${last_time}`;
});

function textContent(id, message) {
  document.getElementById(id).textContent = `${message}`;
}
function innerHTML(id, message) {
  document.getElementById(id).innerHTML = `${message}`;
}
