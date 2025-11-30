## Como Rodar a Aplicação
1. Crie um ambiente virtual:
   ```bash
   python3 -m venv venv
   ```

2. Ative o ambiente virtual:
   - No macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
   - No Windows:
     ```bash
     venv\Scripts\activate
     ```

3. Instale as dependências:
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

4. Execute em um terminal dentro da pasta `server`:
   ```bash
   uvicorn main:app --reload
   ```

5. Execute em um terminal dentro da pasta `client`:
   ```
   python -m http.server 3000
   ```

7. A aplicação frontend estará rodando em `http://localhost:3000`, e a back em `http://localhost:8000`

## API Documentation

Após iniciar o servidor, acesse a documentação interativa da API em:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Estrutura do Projeto
Front(Client):
- `*.html`: Estrutura das páginas (Login, Cadastro e Dashboard)
- `css/`: Estilos globais e design de componentes (Modais, Toasts)
- `js/api.js`: Cliente HTTP centralizado (Wrapper do fetch com interceptação de erros)
- `js/auth.js`: Gerenciamento de sessão, Token JWT e proteção de rotas
- `js/tasks.js`: Camada de serviço para comunicação com a API de tarefas
- `js/page-*.js`: Controladores de página (Lógica específica de DOM e Eventos de cada tela)

Back(Server):
- `main.py`: Ponto de entrada da aplicação FastAPI
- `entities/`: Definições das entidades do banco de dados
- `schemas/`: Schemas Pydantic para validação
- `usecases/`: Lógica de negócio
- `security.py`: Utilitários de segurança e autenticação
- `database/`: Configurações do banco de dados
- `tests/`: Testes unitários
