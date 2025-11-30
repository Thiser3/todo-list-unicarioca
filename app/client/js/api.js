const API_URL = "http://localhost:8000";

export async function request(endpoint, method = "GET", body = null) {
    const headers = { "Content-Type": "application/json" };
    const token = localStorage.getItem("token");

    if (token) headers["Authorization"] = `Bearer ${token}`;

    const config = { method, headers };
    if (body) config.body = JSON.stringify(body);

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        
        if (response.status === 401) {
const response = await fetch(`${API_URL}${endpoint}`, config);
        

        if (response.status === 401) {
            if (!window.location.pathname.includes("login.html")) {
                localStorage.removeItem("token");
                window.location.href = "login.html";
                return;
            }
        }

        const data = await response.json();
        }

        if (response.status === 204) {
            return null;
        }

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.detail || "Erro na requisição");
        }

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}