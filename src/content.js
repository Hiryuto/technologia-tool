var CharacterImgs;
var href = location.href;
var CharacterImgs;

setInterval(() => {
  setTimeout(() => {
    var cl2 = document.getElementsByClassName("star-image-area");
    for (i = 0; i < cl2.length; i++) {
      var clstr = cl2[i].innerHTML;
      clstr = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAfCAYAAABplKSyAAAAAXNSR0IArs4c6QAABRBJREFUWAnFV1tMXGUQnvnPOXvjvioLTUoFacFKikUJJba0pQu2YCEqFXwwah/0wZgYow/eUpI+1MQHjLekvtQXY9q3ploS2oqFWC8QTTRVU6yV1oJcyn2713PG+RfOdpe9wMKDJ9nz///8M998Z2b+OWcB1nH5BppLPKf3tqwDImwq1gOARqAtGDSa14MhbddFwjCojULkplOH7OshsmYSNOguYsfV/MuYoYlH/xcSfl08ecex0XZnnv5s7ZHgVJjuiOggnT1gNdfpjmsiQT81bECk2ihn2dMeb0PUOq3pmkj4g/QEEWC0JzTWnpI1kSADI6mIECFqocEXtMg6jUnaJOj7Fhci7FrugwDy5q7+Xr9cvpp12iT86H2cCzGhnQEiPkKrYKEGL+3fpws9jcqmx5LiktE4e7KuKel+3IaiZ2/09alzgyEPOuBt1UlCzUUhbLCB+2jx8sKL2BOMIOI1jkZxRCYniLN8n9WJvoqRRy0oBKP6PA7DAvkMH9gF6l3Y/p03XOFTx905uheOM3C7tBEazDChIcUJHi0Ls0CjUiaVE4U3wXUxzbItvuHAGJ8TlecTAFQe0SH0kReGjHmaMjxgoSDcyzqFch8Bf0Sr5WnXG+f/WlxHrADGu9yHefkBg2VEifkhgRQHXlWdMKrmMogDC0GQk8FGvdd9rA42CqLVmIfr7DTIT3k3GbCZMSwxOAAGR/G9/ILyd/DFT4PmXsxZl8KJ9/eXAYS+4KhsN5USjYqGs1qO6PPP+b36JO1mfVciPVPGzkcBlGcKjvReMGXmGEdCbvBb0TI5Mv0uz17hEMbpcARuEMLNjAoI+ScCWvBPspGOCgFVmMDRIwN86chUns9+7ZvJaLk5j3NgbshxvKvxAEfwMyaTL9eclgW+D3JPqNXuosu2UqySNaHPwW+hUdrDKpf4V2Lmng38TPj1giMXP2R50islCWm18HFTwe1g4ASXRSbnfjMTcKGCt7Oq8RY/+calwswNXoMbuo9KOeweTs0Ak80Rmvac660LvyT1vrSRsOlEG2W+dPZfPrif8NPtlATknr0MByQBU4+dWtVN4ONIGTyXRb2Ho3dmNQQkxookpBLoxqHwyDc+HZfVnPi2DUgVqgv6TD0eV909VyQhi5QdHJTgHOqAvYyPY5K2LfKgRtjwb6nL19bJo3X3L05T31ckMTE64+ZUcHcAsG3hwkO8Lykkgd1SRLOyr0gdPerDJ6kNb6xIAmjxC0rJwiuaEx6JAUMYI6Rw1zPl/GqrVPMX08LkV5WSlCSot1NFglbkJu8o5+9qgsj3Aqem22YX2/KyMvfyMfzIJCFHkYcPCwv+w+HYNn60TnbOlFdKElO/flvPp8BpK4Z+UHCrRJJ1waflVWtNTzNW9oxjU7c/r6PvZUDRwmSWmhFlcFrGpb78WyDHVFdKEhJAOGBYuwdqJAjn+opQ1B22mp4uJhPOuwnubL94xmK3VrL8aykjFarUfOwnSvAVZhotjUlJ8KlQOPytjgdwmr3xaxdPWO2iylLd/fMyjMgyo/XcSO5T9Q3c6N9kMiHFSZXCQgVjx9wlEaUEk6Qkbo3N7rZtoj+ECsUCRId1x7nDHH5PAowYEWKn4WzvPyYUZSe340lLEd40Av6o/ygx6uFFUhLCTo2WQuEnUh+01vacjDdNLclp6/0hNztzO6dlSHNhwhdbagTenTu971miTnVFxVUoTH2+q4NOPRT9URRj9R94gtDsPwXawwAAAABJRU5ErkJggg==" alt="StarLargeClearedImage">`;
      document.getElementsByClassName("star-image-area")[i].innerHTML = clstr;
    }
    var cl3 = document.getElementsByClassName("clear-stars");
    for (i = 0; i < cl3.length; i++) {
      var clstr = cl3[i].innerHTML;
      clstr = `<div class="star cleared"></div><div class="star cleared"></div><div class="star cleared"></div>`;
      document.getElementsByClassName("clear-stars")[i].innerHTML = clstr;
    }
    var cl4 = document.getElementsByClassName("opened");
    console.log(cl4);
    console.log(cl4.classList);
    cl4.classList.replace("opened", "cleared");
  }, 1000);
}, 500);
