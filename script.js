document.addEventListener("DOMContentLoaded", () => {
  let toDoInput = document.getElementById("input");
  let toDoButton = document.getElementById("add-button");
  let taskList = document.getElementById("task-list");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let taskNo = document.getElementById("task-number");
  let taskNoDisplay = document.getElementById("task-no-display");

  renderTasks();
  toDoButton.addEventListener("click", function (e) {
    e.preventDefault();
    let tasktext = toDoInput.value.trim();
    if (tasktext !== "") {
      const newTask = {
        id: Date.now(),
        text: tasktext,
        isCompleted: false,
      };
      tasks.push(newTask);
      saveTasks();
      toDoInput.value = "";
      renderTasks();
    } else {
      return;
    }
  });

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      let taskLi = document.createElement("li");
      taskLi.className = "flex lg:w-200 lg:mx-auto mb-2 lg:text-lg m-1";
      let taskSpan = document.createElement("span");
      taskSpan.className =
        "flex-1 text-black cursor-pointer font-bold text-center bg-gray-100 rounded-md border-none outline-none";
      taskSpan.innerText = task.text;
      taskSpan.id = task.id;

      let dltBtn = document.createElement("button");
      dltBtn.className =
        "flex-none ml-1 cursor-pointer bg-red-500 font-sans rounded-md w-10 lg:w-22 hover:bg-red-600";
      dltBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

      dltBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        tasks = tasks.filter((t) => t.id !== task.id);
        saveTasks();
        renderTasks();
      });

      taskSpan.addEventListener("click", function (e) {
        e.stopPropagation();
        task.isCompleted = !task.isCompleted;
        saveTasks();
        renderTasks();
      });

      taskSpan.classList.toggle("text-green-500", task.isCompleted);
      taskSpan.classList.toggle("bg-gray-200", task.isCompleted);
      taskSpan.classList.toggle("text-black", !task.isCompleted);
      taskSpan.classList.toggle("bg-gray-100", !task.isCompleted);

      taskLi.appendChild(taskSpan);
      taskLi.appendChild(dltBtn);
      taskList.appendChild(taskLi);
    });
    let taskCheck = tasks.filter((t) => !t.isCompleted);

    taskNo.innerText = taskCheck.length;

    taskNoDisplay.innerHTML =
      taskNo.innerText === 1
        ? `You have <span class="text-sky-500 font-bold">${taskNo.innerText}</span> task pending!`
        : `You have <span class="text-sky-500 font-bold">${taskNo.innerText}</span> tasks pending!`;
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
