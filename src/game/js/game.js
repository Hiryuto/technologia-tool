getgamedata()

document.getElementById("exploration").addEventListener("click", () => {
  window.location.href = "exploration.html";
});
document.getElementById("popup").addEventListener("click", () => {
  window.location.href = "../popup.html";});

function getgamedata(label,value){
  chrome.storage.sync.get([`${label}`], function (response) {
    return value = response.label;
  });
}