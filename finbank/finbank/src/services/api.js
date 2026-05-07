const API_URL = 'http://localhost:3000';

async function request(path, method = 'GET', body = null, token = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(API_URL + path, opts);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro desconhecido');
  return data;
}

export const authService = {
  login: (email, password) => request('/auth/login', 'POST', { email, password }),
  register: (name, email, cpf, password) => request('/auth/register', 'POST', { name, email, cpf, password }),
};

export const contaService = {
  getMinha: (token) => request('/contas/minha', 'GET', null, token),
  getBalance: (token) => request('/contas/balance', 'GET', null, token),
  getResumo: (token) => request('/contas/resumo', 'GET', null, token),
  getExtrato: (token) => request('/contas/extrato', 'GET', null, token),
  depositar: (value, token) => request('/contas/depositar', 'POST', { value }, token),
  sacar: (value, token) => request('/contas/sacar', 'POST', { value }, token),
  transferir: (usuarioRecebendo, value, token) =>
    request('/contas/transferir', 'POST', { usuarioRecebendo, value }, token),
};
