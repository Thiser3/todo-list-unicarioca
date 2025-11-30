import { logout, requireAuth } from './auth.js';
import { getTasks, createTask, deleteTask, updateTask } from './tasks.js';

requireAuth();

const taskList = document.getElementById('task-list');
const editModal = document.getElementById('edit-modal');
const confirmModal = document.getElementById('confirm-modal');
const toastElement = document.getElementById('toast');

let currentTasks = []; 
let taskIdToDelete = null;

function setupActionButtons() {
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (e.target.closest('.modal')) return;
            const id = e.target.dataset.id;
            openConfirmModal(id);
        });
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            openEditModal(id);
        });
    });
}

function openConfirmModal(id) {
    taskIdToDelete = id; 
    confirmModal.classList.remove('hidden'); 
}

function closeConfirmModal() {
    taskIdToDelete = null;
    confirmModal.classList.add('hidden');
}

document.getElementById('confirm-delete-btn').addEventListener('click', async () => {
    if (!taskIdToDelete) return; 
    try {
        await deleteTask(taskIdToDelete); 
        closeConfirmModal();
        renderTasks();
        showToast("Tarefa excluída com sucesso! 🗑️");
    } catch (error) {
        alert("Erro ao excluir: " + error.message);
    }
});

document.getElementById('cancel-delete-btn').addEventListener('click', closeConfirmModal);

async function renderTasks() {
    taskList.innerHTML = '<p>Carregando...</p>';
    try {
        const response = await getTasks();
        currentTasks = Array.isArray(response) ? response : (response.tasks || []);

        taskList.innerHTML = '';
        
        if (currentTasks.length === 0) {
            taskList.innerHTML = '<p>Nenhuma tarefa encontrada.</p>';
            return;
        }

        currentTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';
            const dateStr = task.deadline ? new Date(task.deadline).toLocaleDateString() : '';

            //Botão de Editar
            li.innerHTML = `
                <div class="task-info">
                    <h3>${task.title}</h3>
                    <p>${task.description || ''} ${dateStr ? ' • 📅 ' + dateStr : ''}</p>
                </div>
                <div class="actions">
                    <button class="edit-btn secondary" data-id="${task.id}">✏️</button>
                    <button class="delete-btn" data-id="${task.id}">🗑️</button>
                </div>
            `;
            taskList.appendChild(li);
        });

        setupActionButtons();

    } catch (error) {
        console.error(error);
        taskList.innerHTML = '<p>Erro ao carregar.</p>';
    }
}

function openEditModal(id) {
    const task = currentTasks.find(t => t.id == id);
    
    if (!task) return;

    document.getElementById('edit-id').value = task.id;
    document.getElementById('edit-title').value = task.title;
    document.getElementById('edit-desc').value = task.description || '';
    document.getElementById('edit-date').value = task.deadline || '';

    editModal.classList.remove('hidden');
}

function closeEditModal() {
    editModal.classList.add('hidden');
}

document.getElementById('cancel-edit-btn').addEventListener('click', closeEditModal);

document.getElementById('edit-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('edit-id').value;
    const title = document.getElementById('edit-title').value;
    const desc = document.getElementById('edit-desc').value;
    const date = document.getElementById('edit-date').value;

    try {
        await updateTask(id, title, desc, date);
        
        closeEditModal();
        renderTasks();

        showToast("Tarefa atualizada com sucesso! ✅"); 
        
    } catch (error) {
        alert("Erro ao editar: " + error.message);
    }
});

document.getElementById('logout-btn').addEventListener('click', logout);

document.getElementById('add-task-btn').addEventListener('click', async () => {
    const title = document.getElementById('task-title').value;
    const desc = document.getElementById('task-desc').value;
    const date = document.getElementById('task-date').value;
    if (!title) return alert('Título obrigatório');
    await createTask(title, desc, date || null);
    document.getElementById('task-title').value = '';
    document.getElementById('task-desc').value = '';
    document.getElementById('task-date').value = '';
    renderTasks();
});

function showToast(message) {
    toastElement.textContent = message;
    toastElement.classList.add('visible');

    // Remove a classe após 3 segundos
    setTimeout(() => {
        toastElement.classList.remove('visible');
    }, 3000);
}

renderTasks();