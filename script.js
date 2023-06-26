// Define UI elements
const form = document.querySelector("#task-form");
const taskList = document.querySelector("ul");
const clearBtn = document.querySelector("#clear-task-btn");
const filter = document.querySelector("#task-filter");
const taskInput = document.querySelector("#new-task");

// Define event listeners
form.addEventListener("submit", addTask);
taskList.addEventListener("click", removeTask);
clearBtn.addEventListener("click", clearTasks);
filter.addEventListener("keyup", filterTask);

// Define functions

// addTask
function addTask(e) {
  let newValue = taskInput.value;
  if (newValue === "") {
    alert("Add a task");
  } else {
    let li = document.createElement("li");
    let textNode = document.createTextNode(newValue);
    li.appendChild(textNode);

    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerHTML = " x";
    li.appendChild(link);

    taskList.appendChild(li);

    taskInput.value = "";
  }
  e.preventDefault();
}

// Remove Task
function removeTask(e) {
  if (e.target.hasAttribute("href") && confirm("Are You sure?")) {
    let ele = e.target.parentElement;
    ele.remove();
  }
}

// clearTasks

function clearTasks(e) {
  if (confirm("Are you sure?")) {
    let allEle = taskList.querySelectorAll("li");
    allEle.forEach((ele) => ele.remove());
  }
}

// filterTask
function filterTask(e) {
  let text = e.target.value;
  if (text !== "") {
    text = text.toLowerCase();
  }

  document.querySelectorAll("li").forEach((task) => {
    let item = task.firstChild.textContent;
  });
}
