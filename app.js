// Todo List App - Modern JavaScript Implementation

// Task Manager Class
class TodoApp {
  constructor() {
    this.tasks = [];
    this.currentFilter = "all";
    this.nextId = 1;

    this.initializeElements();
    this.loadTasks();
    this.bindEvents();
    this.render();
  }

  initializeElements() {
    this.taskForm = document.getElementById("taskForm");
    this.taskInput = document.getElementById("taskInput");
    this.taskList = document.getElementById("taskList");
    this.taskStats = document.getElementById("taskStats");
    this.taskCount = document.getElementById("taskCount");
    this.clearCompletedBtn = document.getElementById("clearCompleted");
    this.actionsContainer = document.getElementById("actionsContainer");
    this.filterBtns = document.querySelectorAll(".filter-btn");
  }

  bindEvents() {

    this.taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addTask();
    });


    this.filterBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.setFilter(e.target.dataset.filter);
      });
    });
    this.clearCompletedBtn.addEventListener("click", () => {
      this.clearCompleted();
    });


    this.taskList.addEventListener("click", (e) => {
      this.handleTaskAction(e);
    });

  document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.cancelEdit();
      }
    });
  }

  addTask() {
    const text = this.taskInput.value.trim();

    if (!text) {
      this.showError("Please enter a task");
      return;
    }

    const task = {
      id: this.nextId++,
      text: text,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    this.tasks.unshift(task);
    this.taskInput.value = "";
    this.saveTasks();
    this.render();
  }

  handleTaskAction(e) {
    const taskItem = e.target.closest(".task-item");
    if (!taskItem) return;

    const taskId = parseInt(taskItem.dataset.taskId);
    const task = this.tasks.find((t) => t.id === taskId);


    if (
      e.target.classList.contains("task-checkbox") ||
      (e.target.closest(".task-text") &&
        !taskItem.classList.contains("editing"))
    ) {
      this.toggleComplete(taskId);
    }

    else if (e.target.classList.contains("edit-btn")) {
      this.editTask(taskId);
    }

    else if (e.target.classList.contains("delete-btn")) {
      if (confirm("Are you sure you want to delete this task?")) {
        this.deleteTask(taskId);
      }
    }

    else if (e.target.classList.contains("save-btn")) {
      this.saveTask(taskId);
    }


    else if (e.target.classList.contains("cancel-btn")) {
      this.cancelEdit();
    }
  }

  toggleComplete(taskId) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
      this.render();
    }
  }

  editTask(taskId) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (!task) return;


    this.cancelEdit();

    const taskItem = document.querySelector(`[data-task-id="${taskId}"]`);
    if (!taskItem) return;

    taskItem.classList.add("editing");

    const textDiv = taskItem.querySelector(".task-text");
    const timeDiv = taskItem.querySelector(".task-time");
    const actionsDiv = taskItem.querySelector(".task-actions");

    const originalHTML = textDiv.innerHTML;

    const input = document.createElement("input");
    input.type = "text";
    input.className = "task-edit-input";
    input.value = task.text;

    textDiv.innerHTML = "";
    textDiv.appendChild(input);
    input.focus();
    input.select();


    actionsDiv.style.display = "none";

    const editActions = document.createElement("div");
    editActions.className = "task-edit-actions";
    editActions.innerHTML = `
            <button class="save-btn" type="button">Save</button>
            <button class="cancel-btn" type="button">Cancel</button>
        `;

    taskItem.appendChild(editActions);


    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.saveTask(taskId);
      } else if (e.key === "Escape") {
        this.cancelEdit();
      }
    });
  }

  saveTask(taskId) {
    const taskItem = document.querySelector(`[data-task-id="${taskId}"]`);
    if (!taskItem) return;

    const input = taskItem.querySelector(".task-edit-input");
    const newText = input.value.trim();

    if (!newText) {
      this.showError("Task cannot be empty");
      return;
    }

    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      task.text = newText;
      this.saveTasks();
      this.render();
    }
  }

  cancelEdit() {
    const editingItem = document.querySelector(".task-item.editing");
    if (editingItem) {
      editingItem.classList.remove("editing");
      this.render();
    }
  }

  deleteTask(taskId) {
    const taskIndex = this.tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) return;

    const taskItem = document.querySelector(`[data-task-id="${taskId}"]`);
    if (taskItem) {
      taskItem.classList.add("deleting");
      setTimeout(() => {
        this.tasks.splice(taskIndex, 1);
        this.saveTasks();
        this.render();
      }, 300);
    }
  }

  clearCompleted() {
    if (!confirm("Are you sure you want to clear all completed tasks?")) {
      return;
    }

    this.tasks = this.tasks.filter((t) => !t.completed);
    this.saveTasks();
    this.render();
  }

  setFilter(filter) {
    this.currentFilter = filter;


    this.filterBtns.forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-pressed", "false");
    });

    const activeBtn = document.querySelector(`[data-filter="${filter}"]`);
    if (activeBtn) {
      activeBtn.classList.add("active");
      activeBtn.setAttribute("aria-pressed", "true");
    }

    this.render();
  }

  getFilteredTasks() {
    switch (this.currentFilter) {
      case "active":
        return this.tasks.filter((t) => !t.completed);
      case "completed":
        return this.tasks.filter((t) => t.completed);
      default:
        return this.tasks;
    }
  }

  render() {
    const filteredTasks = this.getFilteredTasks();


    if (filteredTasks.length === 0) {
      this.taskList.innerHTML = `
                <li class="empty-state">
                    <div class="empty-state-icon">📝</div>
                    <p>No tasks found</p>
                </li>
            `;
    } else {
      this.taskList.innerHTML = filteredTasks
        .map((task) => this.renderTask(task))
        .join("");
    }


    const activeCount = this.tasks.filter((t) => !t.completed).length;
    this.taskCount.textContent = `${activeCount} ${
      activeCount === 1 ? "task" : "tasks"
    } left`;

    const hasCompleted = this.tasks.some((t) => t.completed);
    this.actionsContainer.style.display = hasCompleted ? "block" : "none";


    if (this.tasks.length > 0) {
      this.nextId = Math.max(...this.tasks.map((t) => t.id)) + 1;
    }
  }

  renderTask(task) {
    const timeAgo = this.formatTime(task.createdAt);

    return `
            <li class="task-item ${
              task.completed ? "completed" : ""
            }" data-task-id="${task.id}">
                <input type="checkbox" class="task-checkbox" ${
                  task.completed ? "checked" : ""
                }>
                <div class="task-text">${this.escapeHtml(task.text)}</div>
                <div class="task-time">${timeAgo}</div>
                <div class="task-actions">
                    <button class="action-btn edit-btn" aria-label="Edit task">Edit</button>
                    <button class="action-btn delete-btn" aria-label="Delete task">Delete</button>
                </div>
            </li>
        `;
  }

  formatTime(isoString) {
    const now = new Date();
    const created = new Date(isoString);
    const diffMs = now - created;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return created.toLocaleDateString();
  }

  escapeHtml(text) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }

  showError(message) {
    alert(message);
  }


  saveTasks() {
    try {
      localStorage.setItem("todoTasks", JSON.stringify(this.tasks));
      localStorage.setItem("todoNextId", this.nextId.toString());
    } catch (e) {
      console.error("Failed to save tasks:", e);
      alert("Failed to save tasks. Your browser may not support localStorage.");
    }
  }

  loadTasks() {
    try {
      const savedTasks = localStorage.getItem("todoTasks");
      const savedNextId = localStorage.getItem("todoNextId");

      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
      }

      if (savedNextId) {
        this.nextId = parseInt(savedNextId);
      }
    } catch (e) {
      console.error("Failed to load tasks:", e);
      alert("Failed to load tasks. Starting fresh.");
      this.tasks = [];
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new TodoApp();
});
