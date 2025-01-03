
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-btn');
const previousButton = document.getElementById('previous-btn');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// render krega 
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.toggle('completed', task.completed);

    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
    `;

    taskList.appendChild(li);
  });
}

// new task add krene ke liye
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  tasks.push({ text: taskText, completed: false });
  taskInput.value = ''; // Clear input field

  // local storage me save krene ke liye
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// complition ke liye
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// delete 
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// add task ke liye
addButton.addEventListener('click', addTask);

// previous task ke liye
previousButton.addEventListener('click', function() {
  if (tasks.length === 0) {
    alert('No previous tasks saved!');
  } else {
    renderTasks();
  }
});

// add krene ke liye by enter
taskInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

// initial reload ke liye
renderTasks();
