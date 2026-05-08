💸 Projeto Fintech — Frontend

Interface web do sistema de conta bancária desenvolvido como projeto do curso de Desenvolvimento de Sistemas do SENAI.

**Equipe:** Gustavo, Ana, Fernanda

---

## 🚀 Tecnologias

- React
- Vite
- React Router DOM

---

## 📁 Estrutura do projeto

```
finbank/finbank
├── src
├── App.jsx
├── components
│   ├── Modal.jsx
│   ├── Modal.module.css
│   ├── Sidebar.jsx
│   ├── Sidebar.module.css
│   ├── Toast.jsx
│   ├── Toast.module.css
│   ├── TransactionItem.jsx
│   └── TransactionItem.module.css
├── context
│   └── AuthContext.jsx
├── hooks
│   └── useToast.js
├── index.css
├── main.jsx
├── pages
│   ├── AuthPages.jsx
│   ├── AuthPages.module.css
│   ├── Dashboard.jsx
│   ├── Dashboard.module.css
│   ├── Extrato.jsx
│   ├── Extrato.module.css
│   ├── Transferir.jsx
│   └── Transferir.module.css
└── services
    └── api.js
```

---

## ⚙️ Como rodar o projeto

**1. Clone o repositório:**
```bash
git clone https://github.com/seuusuario/FintechFront.git
cd FintechFront/finbank
```

**2. Instale as dependências:**
```bash
npm install
```

**3. Configure a URL da API no arquivo `src/services/api.js`:**
```javascript
const API_URL = 'http://localhost:3000';
```

**4. Rode o projeto:**
```bash
npm run dev
```

Acesse `http://localhost:5173` no navegador.

---

## 👥 Equipe

| Nome | Função |
|------|--------|
| Gustavo | Backend |
| Ana | Frontend |
| Fernanda | Frontend |
