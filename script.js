// === Select Elements ===
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

// === Initialize ===
window.onload = renderTasks;

// === Add Task ===
addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearAll);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return alert("Please enter a task!");

  const tasks = getTasks();
  tasks.push({ text: taskText, completed: false });
  saveTasks(tasks);

  taskInput.value = "";
  renderTasks();
}

// === Render Tasks ===
function renderTasks() {
  const tasks = getTasks();
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) li.classList.add("completed");

    // Toggle completion on click of the list item
    li.addEventListener("click", () => toggleTask(index));

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent li click
      deleteTask(index);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  taskCount.textContent = `${tasks.length} Task${tasks.length !== 1 ? "s" : ""}`;
}

// === Toggle Task Complete ===
function toggleTask(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks();
}

// === Delete Single Task ===
function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks();
}

// === Clear All Tasks ===
function clearAll() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    localStorage.removeItem("tasks");
    renderTasks();
  }
}

// === Local Storage Helpers ===
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}
