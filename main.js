const data = {
  capital: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  small: "abcdefghijklmnopqrstuvwxyz".split(""),
  number: "0123456789".split(""),
  sign: "!@#$%^&*()_-}{[]|/".split(""),
};

const title = document.querySelector(".title");
const lengthInput = document.querySelector("#length");
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const password = document.querySelector(".password");
const generateBtn = document.querySelector(".generate-btn");
const copyBtn = document.querySelector(".copy-btn");

const generateCode = (filters, len) => {
  if (filters.length === 0) return "";

  const codeChars = [];
  filters.forEach((filter) => {
    codeChars.push(...data[filter]);
  });

  let code = "";
  for (let i = 0; i < len; i++) {
    const idx = Math.floor(Math.random() * codeChars.length);
    code += codeChars[idx];
  }

  return code;
};

const copyToClipboard = (text) => {
  const el = document.createElement("textarea");
  el.innerText = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

generateBtn.addEventListener("click", (evt) => {
  evt.preventDefault();

  const len = lengthInput.value;
  const filters = [];
  checkboxes.forEach((input) => {
    if (input.checked) filters.push(input.dataset.type);
  });

  const code = generateCode(filters, len);
  password.innerText = code;
});

copyBtn.addEventListener("click", () => {
  copyToClipboard(password.innerText);
  title.innerText = "Password saved it to the clipboad";
  setTimeout(() => {
    title.innerText = "Password generated";
  }, 750);
});
