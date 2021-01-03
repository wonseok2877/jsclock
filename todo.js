const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

// filter은 array 전체를 훑은 다음, 함수에서 true의 값을 return하는 아이템로만 array를 하나 새로 만든다
// 지금 우리는 li에 없는 id를 가진 toDos를 체크한뒤 지우려한다
// function filterFn(toDo) {
//   return toDo.id === 1;
// }

// because there will be many lists, so todolist must be an array - 여러개가 모인 목록으로 저장
// 여기서 toDos는 cleanToDos의 변화에 따라 같이 변해야 하기 때문에 let
let toDos = [];

// delete
function deleteToDo(event) {
  console.dir(event.target);
  console.log(event.target.parentNode);
  const btn = event.target;
  const li = btn.parentNode;
  // removeChild ! it should start with the parent element
  toDoList.removeChild(li);
  // filter
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

// array의 아이템 갯수대로 id를 부여하면 삭제후 생성시 id가 중복되게 된다. 그래서 순서대로.
let orderedNumber = 1;

function paintToDo(text) {
  // createElement ! javasctipt에서 html속 element 생성
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = orderedNumber;
  orderedNumber += 1;
  delBtn.innerText = "😜";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  //   appendChild ! parent element속에다 뭔가를 집어넣음
  li.appendChild(delBtn);
  li.appendChild(span);
  // html element인 li에다가 id 지정해줌
  li.id = newId;
  toDoList.appendChild(li);
  // now we have to put them in toDos
  const toDoObj = {
    text: text,
    // length는 array 속에 element 갯수를 말해준다. 따라서 id를 순차적으로 정해줄 수 있음
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}
/* you can't save data of javasctipt in local storage, only strings 
javascript make every data in local storage as string ! 
so, we have to change objects to string type  - very nice trick, JSON.stringify*/

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function something(noice) {
  console.log(noice.text);
  paintToDo(noice.text);
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  const span = document.createElement("span");
  // span.innerText = loadedToDos.;
  if (loadedToDos !== null) {
    // JSON.parse ! change strings in localstorage into normal data for javascript
    const parsedToDos = JSON.parse(loadedToDos);
    // forEach ! array에 담겨있는 element들 각각 한 번씩 함수를 실행시켜 줌, 여기선 다른 함수를 부르지 않고 function을 바로 만들어줌
    parsedToDos.forEach(something);
  }
  // else is useless here, because form doesen't have to bring something here.
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
