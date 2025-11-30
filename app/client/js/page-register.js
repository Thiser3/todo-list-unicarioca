import { register, redirectIfLoggedIn } from './auth.js';

redirectIfLoggedIn();

document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('register-error');

    errorElement.textContent = "";
    errorElement.classList.remove("visible");

    try {
        await register(name, email, password);
        localStorage.setItem("register_success", "true");
        window.location.href = "login.html";
        
    } catch (error) {
        console.error(error);
        errorElement.textContent = error.message || "Erro ao tentar cadastrar.";
        errorElement.classList.add("visible");
    }
});