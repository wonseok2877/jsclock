const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();

  clockTitle.innerText = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
}

function clicked() {
  clockTitle.classList.toggle("clicked");
}
function init() {
  // setInterval ! function을 정해진 시간마다 실행시켜준다. 여기선 1초.
  setInterval(() => {
    getTime();
  }, 1000);
  clockTitle.addEventListener("click", clicked);
}

init();
