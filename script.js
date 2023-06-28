//! Define UI elements
const form = document.querySelector("#task-form");
const taskList = document.querySelector("#tasks");
const clearBtn = document.querySelector("#clear-task-btn");
const filter = document.querySelector("#task-filter");
const taskInput = document.querySelector("#new-task");

//! Define event listeners
form.addEventListener("submit", addTask);
taskList.addEventListener("click", removeTask);
clearBtn.addEventListener("click", clearTasks);
filter.addEventListener("keyup", filterTask);
document.addEventListener("DOMContentLoaded", displayTasksFromLocalStorage);

//! Define utility functions

// createLi
function createLi(value) {
  let li = document.createElement("li");
  let textNode = document.createTextNode(value);
  li.appendChild(textNode);

  let link = document.createElement("a");
  link.setAttribute("href", "#");
  link.innerHTML = " x";
  li.appendChild(link);

  taskList.appendChild(li);
}

// getTasksFromLocalStorage
function getTasksFromLocalStorage() {
  let tasks;
  let localStorageItem = localStorage.getItem("tasks");

  if (localStorageItem === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorageItem);
  }
  return tasks;
}

// storeTaskInLocalStorage
function storeTaskInLocalStorage(task) {
  let tasks = getTasksFromLocalStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// removeFromLS
function removeFromLS(taskItem) {
  let tasks = getTasksFromLocalStorage();
  let li = taskItem;
  li.removeChild(li.lastChild);

  tasks.forEach((task, index) => {
    if (li.textContent.trim() === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//! Define Event listener functions

// addTask
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  } else {
    createLi(taskInput.value);
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = "";
  }
  e.preventDefault();
}

// Remove Task
function removeTask(e) {
  if (e.target.hasAttribute("href") && confirm("Are You sure?")) {
    let ele = e.target.parentElement;
    ele.remove();
    removeFromLS(ele);
  }
  e.preventDefault();
}

// clearTasks
function clearTasks(e) {
  if (confirm("Are you sure?")) {
    let allEle = taskList.querySelectorAll("li");
    allEle.forEach((ele) => ele.remove());
    localStorage.clear();
  }
  e.preventDefault();
}

// filterTask
function filterTask(e) {
  let text = e.target.value;
  if (text !== "") {
    text = text.toLowerCase();
  }

  taskList.querySelectorAll("li").forEach((task) => {
    let item = task.firstChild.textContent;

    if (item.toLocaleLowerCase().indexOf(text) !== -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
  e.preventDefault();
}

// function displayTasksFromLocalStorage
function displayTasksFromLocalStorage() {
  let tasks = getTasksFromLocalStorage();
  tasks.forEach((task) => {
    if (task !== undefined) {
      // console.log(task);
      createLi(task);
    }
  });
}
