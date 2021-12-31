const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const DONE = "done";
const HIDDEN = "hidden";
const TODOS_KEY = "todos";
const LINE = "line-through";
const TODOLIST_MAX = 6;

let toDoObjs = [];

function isListFull() {
    if (toDoObjs.length >= TODOLIST_MAX) {
        toDoInput.classList.add(HIDDEN);
    } else {
        toDoInput.classList.remove(HIDDEN);
    }
}

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDoObjs));
    isListFull();
}

function doneToDo(event) {
    const thisLi = event.target.parentElement.parentElement;
    const checked = thisLi.classList.toggle(DONE);
    toDoObjs.forEach((obj) => {
        if (obj.id == thisLi.id) {
            obj.done = obj.done ? false : true;
        }
    });

    const divInLi = event.target.parentElement;
    if (checked) {
        const lineThrough = document.createElement("div");
        lineThrough.classList.add(LINE);
        divInLi.prepend(lineThrough);
    } else {
        divInLi.firstChild.remove();
    }
    saveToDos();
}

function deleteToDo(event) {
    const li = event.target.parentElement.parentElement;
    toDoObjs = toDoObjs.filter((obj) => obj.id !== parseInt(li.id));
    li.remove();
    saveToDos();
}

function paintToDo(toDoObj) {
    const li = document.createElement("li");
    li.id = toDoObj.id;
    const div = document.createElement("div");
    const doneButton = document.createElement("input");
    doneButton.type = "checkbox";
    doneButton.checked = toDoObj.done;
    if (doneButton.checked) {
        const lineThrough = document.createElement("div");
        lineThrough.classList.add(LINE);
        li.classList.toggle(DONE);
        div.prepend(lineThrough);
    }

    doneButton.addEventListener("click", doneToDo);
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "❌";
    deleteButton.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    span.innerText = toDoObj.text;

    div.append(doneButton, span, deleteButton);
    li.appendChild(div);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value = "";
    const newToDoObj = {
        done: false,
        text: newToDo,
        id: Date.now(),
    };
    paintToDo(newToDoObj);
    toDoObjs.push(newToDoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDoObjs = localStorage.getItem(TODOS_KEY);

if (savedToDoObjs !== null) {
    const parsedToDoObjs = JSON.parse(savedToDoObjs);
    toDoObjs = parsedToDoObjs;
    parsedToDoObjs.forEach((element) => {
        paintToDo(element);
    });
}
