const taskInput = document.getElementById('task-input');
const taskDate = document.getElementById('task-date');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');
const deleteSelectedButton = document.getElementById('delete-selected-button');

// Загрузка задач из localStorage
let tasks = loadTasks();
renderTasks();

addTaskButton.addEventListener('click', addTask);
deleteSelectedButton.addEventListener('click', deleteSelectedTasks);

function addTask() {
    const taskText = taskInput.value.trim();
    const taskDateValue = taskDate.value;
    if (taskText !== '') {
        const task = {
            text: taskText,
            date: taskDateValue,
            completed: false,
        };
        tasks.push(task);
        saveTasks();
        renderTasks();
        taskInput.value = '';
        taskDate.value = '';
    }
}

function deleteSelectedTasks() {
    tasks = tasks.filter(task => !task.selected);
    saveTasks();
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');

        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = task.text;

        const taskDate = document.createElement('span');
        taskDate.classList.add('task-date');
        taskDate.textContent = task.date;

        const taskActions = document.createElement('div');
        taskActions.classList.add('task-actions');

        const taskCheckbox = document.createElement('input');
        taskCheckbox.type = 'checkbox';
        taskCheckbox.classList.add('task-checkbox');
        taskCheckbox.checked = task.completed;
        taskCheckbox.addEventListener('change', () => {
            task.completed = !task.completed;
            task.selected = taskCheckbox.checked;
            saveTasks();
            renderTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        const upButton = document.createElement('button');
        upButton.classList.add('up-button');
        upButton.textContent = 'Вверх';
        upButton.addEventListener('click', () => {
            if (index > 0) {
                [tasks[index - 1], tasks[index]] = [tasks[index], tasks[index - 1]];
                saveTasks();
                renderTasks();
            }
        });

        const downButton = document.createElement('button');
        downButton.classList.add('down-button');
        downButton.textContent = 'Вниз';
        downButton.addEventListener('click', () => {
            if (index < tasks.length - 1) {
                [tasks[index + 1], tasks[index]] = [tasks[index], tasks[index + 1]];
                saveTasks();
                renderTasks();
            }
        });

        taskActions.appendChild(taskCheckbox);
        taskActions.appendChild(deleteButton);
        taskActions.appendChild(upButton);
        taskActions.appendChild(downButton);

        taskCard.appendChild(taskText);
        taskCard.appendChild(taskDate);
        taskCard.appendChild(taskActions);
        taskList.appendChild(taskCard);
    });
}

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
