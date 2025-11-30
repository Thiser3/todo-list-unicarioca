import { request } from './api.js';

export async function getTasks() {
    return await request('/tasks/');
}

export async function createTask(title, description, deadline) {
    const payload = { title };
    if (description) payload.description = description;
    if (deadline) payload.deadline = deadline;

    return await request('/tasks/', 'POST', payload);
}

export async function updateTask(id, title, description, deadline) {
    const payload = {
        title: title,
        description: description,
        deadline: deadline || null
    };
    return await request(`/tasks/${id}`, 'PUT', payload);
}

export async function deleteTask(taskId) {
    return await request(`/tasks/${taskId}`, 'DELETE');
}
