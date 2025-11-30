import { login, redirectIfLoggedIn } from './auth.js';

// Se já estiver logado, vai para a home
redirectIfLoggedIn();

const toastElement = document.getElementById('toast');

function showToast(message) {
    toastElement.textContent = message;
    toastElement.classList.add('visible');

    setTimeout(() => {
        toastElement.classList.remove('visible');
    }, 3000);
}

if (localStorage.getItem("register_success")) {
    showToast("Conta criada com sucesso! Faça login. ✅");
    localStorage.removeItem("register_success");
}

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMsgElement = document.getElementById('error-msg');

    errorMsgElement.classList.remove("visible");
    errorMsgElement.textContent = "";

    try {
        await login(email, password);
        window.location.href = "index.html"; 
    } catch (error) {
        console.error("Erro no login:", error);

        // Se o erro for de conexão, avisa. Se for do backend, mostra a msg.
        errorMsgElement.textContent = error.message || "Erro desconhecido.";
        errorMsgElement.classList.add("visible");
    }
});