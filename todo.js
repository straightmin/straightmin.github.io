const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    finishedList = document.querySelector(".js-finishedList");

const TODOS_LS = "PENDING";
const FINISH_LS = "FINISHED";

let toDos = [];
let finished = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id, 10);
  });
  toDos = cleanToDos;
  saveToDos();
}

function deleteFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanFinished = finished.filter(function (finish) {
    return finish.id !== parseInt(li.id, 10);
  });
  finished = cleanFinished;
  saveFinished();
}

function moveToDo(event) {
  const parent = event.target.parentNode;
  const text = parent.querySelector("span").innerText;
  paintToDo(text);
  deleteFinished(event);
}

function moveFinish(event) {
  const parent = event.target.parentNode;
  const text = parent.querySelector("span").innerText;
  paintFinished(text);
  deleteToDo(event);
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function saveFinished() {
  localStorage.setItem(FINISH_LS, JSON.stringify(finished));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const doneBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  span.innerText = text;
  delBtn.innerText = "❌";
  doneBtn.innerText = "✔";
  delBtn.addEventListener("click", deleteToDo);
  doneBtn.addEventListener("click", moveFinish);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(doneBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function paintFinished(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const revertBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = finished.length + 1;
  span.innerText = text;
  delBtn.innerText = "❌";
  revertBtn.innerText = "⏪";
  delBtn.addEventListener("click", deleteFinished);
  revertBtn.addEventListener("click", moveToDo);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(revertBtn);
  li.id = newId;
  finishedList.appendChild(li);
  const finObj = {
    text: text,
    id: newId
  };
  finished.push(finObj);
  saveFinished();
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function loadFinished() {
  const loadedFinish = localStorage.getItem(FINISH_LS);
  if (loadedFinish !== null) {
    const parsedFinish = JSON.parse(loadedFinish);
    parsedFinish.forEach(function (finish) {
      paintFinished(finish.text);
    });
  }
}

function addToDo(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function init() {
  loadToDos();
  loadFinished();
  toDoForm.addEventListener("submit", addToDo);
}

init();
