window.onload = function() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (savedTasks) {
    savedTasks.forEach(task => {
      addTask(task);
    });
  }
}

function addTask(taskText) {
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');

  if (taskText || taskInput.value.trim() !== '') {
    const taskTextToAdd = taskText || taskInput.value.trim();

    const li = document.createElement('li');
    li.textContent = taskTextToAdd;

    const deleteButton = document.createElement('span');
    deleteButton.textContent = ' ❌';
    deleteButton.className = 'delete';
    deleteButton.onclick = function() {
      li.remove();
      saveTasks();
    };

    li.appendChild(deleteButton);
    taskList.appendChild(li);

    if (!taskText) {
      taskInput.value = '';
    }

    saveTasks();
  }
}

function saveTasks() {
  const taskNodes = document.querySelectorAll('#taskList li');
  const tasks = [];
  taskNodes.forEach(node => {
    tasks.push(node.textContent.replace(' ❌', ''));
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
