async function main() {
  var request = await fetch(
    "https://register.technologia-schoolofmagic.jp/api/players",
    {
      method: "GET",
      //   modes: "cors",
      headers: {
        authorization: "9781cb39-2abf-43d2-b15a-668386ef9742",
      },
    }
  );
  var data = await request.json();
  document.getElementById("sex").innerHTML = `<p>${data.sex}</p>`;
}
main();
