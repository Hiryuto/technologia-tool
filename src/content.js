var characterurls;

setInterval(() => {
	chrome.storage.sync.get(["CharacterUrl"], function (value) {
		characterurls = value.CharacterUrl;
	});
	if (characterurls == undefined) {
		characterurls = "https://i.gyazo.com/66974b194f7eeecf4d3ab8ddc3450ac2.gif";
	}
	var urls = window.location.href;
	if (
		$("canvas.unselectable").length &&
		urls.match(/https:\/\/player.technologia-schoolofmagic.jp\/player\/step.*/)
	) {
		$("canvas.unselectable").remove();
		var cl = document.getElementsByClassName("react-draggable");
		for (i = 0; i < cl.length; i++) {
			var clstr = cl[i].textContent;
			clstr = '<img src="' + characterurls + '" width="180" height="300">';
			document
				.getElementsByClassName("react-draggable")
				[i].insertAdjacentHTML("afterbegin", clstr);
		}
	}
}, 500);
