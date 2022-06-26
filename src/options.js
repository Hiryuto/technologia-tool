function save_options() {
  chrome.storage.sync.set(
    {
      CharacterUrl: document.getElementById("url").value,
    },
    function () {
      var status = document.getElementById("status");
      status.textContent = "設定を保存しました。";
      setTimeout(function () {
        status.textContent = "";
      }, 5000);
    }
  );
}
function restore_options() {
  chrome.storage.sync.get(
    {
      CharacterUrl: "https://i.gyazo.com/66974b194f7eeecf4d3ab8ddc3450ac2.gif",
    },
    function (items) {
      document.getElementById("url").value = items.CharacterUrl;
    }
  );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
