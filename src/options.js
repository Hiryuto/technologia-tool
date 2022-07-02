var CharacterImgs;
var CharacterImg;
var TempImg;
var Message = document.getElementById("message");
function save_options() {
	if (document.querySelector("#message")) {
		alert("画像を指定してください");
	} else {
		chrome.storage.local.get(["TempImg"], function (result) {
			TempImg = result.TempImg;
		});
		setTimeout(() => {
			chrome.storage.local.set({ CharacterImg: TempImg }, function () {
				var status = document.getElementById("status");
				status.innerHTML = `<h5 style="margin-top: 20px;">設定を保存しました。</h5>`;
				setTimeout(function () {
					status.textContent = "";
				}, 5000);
			});
		}, 1000);
	}
}
function Textdecision() {
	let text = document.getElementById("url").value;
	var urlcheck1 =
		/https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+/g;
	if (!text.match(urlcheck1)) {
		return (document.querySelector(
			"#uploadImageArea"
		).innerHTML = `<h5 id="message" class="message" style="color:red;">URLを入力してください</h5>`);
	} else {
		document.getElementById("uploadImage").value = "";
		document.getElementById("filename").textContent = "選択されていません";
		document.querySelector("#uploadImageArea").innerHTML =
			"<h6>しばらくお待ち下さい。</h6>";
		ImageTempsave(text);
	}
}

function changeImageToBase64() {
	document.getElementById("url").value = "";
	document.querySelector("#uploadImageArea").innerHTML =
		"<h6>しばらくお待ち下さい。</h6>";
	const uploadImage = document.querySelector("#uploadImage");
	const file = uploadImage.files[0];
	const reader = new FileReader();
	reader.onload = (event) => {
		const base64Text = event.currentTarget.result;
		var value = base64Text;
		ImageTempsave(value);
	};
	reader.readAsDataURL(file);
}
function ImageTempsave(saveValue) {
	chrome.storage.local.set({ TempImg: saveValue });
	setTimeout(function () {
		chrome.storage.local.get(["TempImg"], function (result) {
			CharacterImgs = result.TempImg;
			document.querySelector(
				"#uploadImageArea"
			).innerHTML = `<img src="${CharacterImgs}" id="image" width="222" height="auto" max-width="100%"
			height="auto"vertical-align= "middle"width= "180px"
			aspect-ratio= "auto 180 / 300"/>`;
			document.getElementById("image").addEventListener("error", function () {
				document.querySelector(
					"#uploadImageArea"
				).innerHTML = `<h5 id="message" class="message" style="color:red;margin-bottom: 20px;">画像が正常に読み込めませんでした。<br><br>&lt;原因&gt;<br><br>URL指定の場合:<a href="${saveValue}" target="_blank" style="color:red;">リンク先</a>に画像がない<br>画像選択の場合:選択した画像にアクセスできない</h5>`;
			});
		});
	}, 1000);
}
document
	.getElementById("uploadImage")
	.addEventListener("change", function (evt) {
		var file = evt.target.files;
		const maxFileSize = 9997544;
		if (file[0].size > maxFileSize) {
			document.querySelector(
				"#uploadImageArea"
			).innerHTML = `<h5 id="message" class="message" style="color:red;">ファイルサイズは10MB以下にしてください</h5>`;
			fileInput.value = "";
			return;
		}
		changeImageToBase64();
		document.getElementById("filename").textContent = file[0].name;
	});

document.getElementById("save").addEventListener("click", save_options);
document.getElementById("decision").addEventListener("click", Textdecision);
