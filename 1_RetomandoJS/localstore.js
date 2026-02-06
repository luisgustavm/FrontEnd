// ================================
// BUSCANDO ELEMENTOS DO DOM
// ================================

// entrada de tarefa
const taskInput = document.getElementById('taskInput');

// botão de adicionar tarefa
const addTaskBtn = document.getElementById('addTaskBtn');

// lista de tarefas
const taskList = document.getElementById('taskList');

console.log(taskInput, addTaskBtn, taskList);

// essa variável vai armazenar todas as tarefas
let tasks = [];

// ================================
// LOCAL STORAGE
// ================================

// Função para SALVAR as tarefas no navegador
function saveTasks() {
    // Converte o array em texto (JSON)
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para CARREGAR as tarefas salvas
function loadTasks() {
    // Busca as tarefas salvas
    const storedTasks = localStorage.getItem('tasks');

    // Se existir algo salvo
    if (storedTasks) {
        // Converte o texto de volta para array
        tasks = JSON.parse(storedTasks);
    }
}

// Carrega as tarefas assim que a página abre
loadTasks();

// ================================
// EVENTO DE CLIQUE (ADICIONAR)
// ================================

// Ler o valor do input (ENTRADA da tarefa)
addTaskBtn.addEventListener('click', () => {

    // Remove espaços extras antes/depois do texto
    const taskText = taskInput.value.trim();

    // Validação: não permitir tarefa vazia
    if (taskText === '') {
        alert('Digite uma tarefa!');
        return;
    }

    // Adiciona a tarefa no array
    tasks.push(taskText);

    // Salva no LocalStorage
    saveTasks();

    // Limpa o input
    taskInput.value = '';

    // Atualiza a lista na tela
    renderTasks();
});

// ================================
// FUNÇÃO DE RENDERIZAÇÃO
// ================================

// Função para mostrar as tarefas na tela
function renderTasks() {

    // Limpa a lista antes de renderizar
    taskList.innerHTML = '';

    // Percorre o array de tarefas
    tasks.forEach((task, index) => {

        const li = document.createElement('li');
        li.textContent = task;

        const marcarBtn = document.createElement('button');
        marcarBtn.textContent = 'Concluir';
        
        // Evento de clique para marcar como feita
        marcarBtn.addEventListener('click', () => {
        li.classList.toggle('done');
        });


        li.appendChild(marcarBtn);


        // Criando o botão para excluir a tarefa
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';

        // Evento de clique para excluir
        deleteBtn.addEventListener('click', () => {
            removeTask(index);
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// ================================
// REMOVER TAREFA
// ================================

function removeTask(index) {

    // Remove a tarefa do array
    tasks.splice(index, 1);

    // Atualiza o LocalStorage
    saveTasks();

    // Atualiza a tela
    renderTasks();
}

// Renderiza as tarefas carregadas do LocalStorage
renderTasks();