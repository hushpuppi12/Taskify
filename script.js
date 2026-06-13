let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks(filteredTasks = tasks) {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <div class="task-info">
        <h3>${task.title}</h3>
        ${task.description ? `<p>${task.description}</p>` : ''}
      </div>
      <div>
        <button onclick="toggleComplete(${index})" style="margin-right:8px; background:none; border:none; font-size:20px;">${task.completed ? '↩️' : '✅'}</button>
        <button onclick="deleteTask(${index})" style="background:none; border:none; font-size:20px;">🗑️</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function addTask() {
  const title = document.getElementById('taskTitle').value.trim();
  const desc = document.getElementById('taskDesc').value.trim();

  if (!title) {
    alert("Please enter a task title!");
    return;
  }

  tasks.push({
    title: title,
    description: desc,
    completed: false,
    createdAt: new Date().toISOString()
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDesc').value = '';
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(index) {
  if (confirm("Delete this task?")) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
}

function filterTasks(status) {
  let filtered = tasks;
  if (status === 'pending') filtered = tasks.filter(t => !t.completed);
  if (status === 'completed') filtered = tasks.filter(t => t.completed);
  renderTasks(filtered);
}

// Initial load
renderTasks();
