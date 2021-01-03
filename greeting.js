const form = document.querySelector(".js-form");
input = form.querySelector("input");
greeting = document.querySelector(".js-greetings");

const USERNAME_LS = "currentUser",
  SHOWINGG_CN = "showing";

function saveName(text) {
  localStorage.setItem(USERNAME_LS, text);
}

function handleSubmittt(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintTexxxt(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWINGG_CN);
  form.addEventListener("submit", handleSubmittt);
}

function paintTexxxt(text) {
  // form element를 지우고 greeting class의 element를 추가함
  form.classList.remove(SHOWINGG_CN);
  greeting.classList.add(SHOWINGG_CN);
  greeting.innerText = `Hello ${text}`;
}

function loadNamee() {
  const currentUser = localStorage.getItem(USERNAME_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintTexxxt(currentUser);
  }
}

function init() {
  loadNamee();
}
init();

/*간단한 버전
const nameValue = localStorage.getItem("wonseok");
function init() {
  input.value = nameValue;
}
init();*/
