import { request } from './api.js';

export async function login(email, password) {
    const data = await request('/auth/login', 'POST', { email, password });
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("user", JSON.stringify(data.user));
}

export async function register(name, email, password) {
    await request('/auth/signup', 'POST', { name, email, password });
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

export function requireAuth() {
    if (!localStorage.getItem("token")) {
        window.location.href = "login.html";
    }
}

// Função para pular login se já estiver logado (usada no login.html)
export function redirectIfLoggedIn() {
    if (localStorage.getItem("token")) {
        window.location.href = "index.html";
    }
}