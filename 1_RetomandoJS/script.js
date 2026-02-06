const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');

let tasks = [];

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Digite uma tarefa!');
        return;
    }

    tasks.push(taskText);
    taskInput.value = '';
    renderTasks();
});

function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';

        deleteBtn.addEventListener('click', () => {
            removeTask(index);
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function removeTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}
