let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

function generateKey() {
  let arr = [...alphabet];
  let currentIndex = arr.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
}

document.getElementById("ec-generate").onclick = function () {
  let input = document.getElementById("ec-input");
  let text = input.value;
  if (!text) return;
  input.value = "";

  let key = [...generateKey()];
  let encrypted = "";
  [...text].forEach((c) => {
    let found = false;
    [...alphabet].forEach((a) => {
      if (a === c) {
        encrypted += key[alphabet.indexOf(a)];
        found = true;
      }
    });
    if (!found) encrypted += c;
  });

  document.getElementById("ec-key").value = key.join("");
  document.getElementById("ec-output").value = encrypted;
};

document.getElementById("ec-decr").onclick = function () {
  let input = document.getElementById("ec-output");
  let text = input.value;
  if (!text) return;
  input.value = "";

  let key = [...(document.getElementById("ec-key").value || "")];
  let decrypted = "";
  [...text].forEach((c) => {
    let found = false;
    [...alphabet].forEach((a) => {
      if (a === c) {
        decrypted += alphabet[key.indexOf(a)];
        found = true;
      }
    });
    if (!found) decrypted += c;
  });

  document.getElementById("ec-input").value = decrypted;
};
