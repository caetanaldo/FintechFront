import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from './AuthPages.module.css';

export function LoginPage({ onGoRegister, onSuccess }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) return setError('Preencha todos os campos');
    setLoading(true);
    try {
      await login(email, password);
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <Logo />
      <h1 className={styles.title}>Bem-vindo de volta</h1>
      <p className={styles.sub}>Acesse sua conta para continuar</p>

      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label>E-mail</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" />
        </div>
        <div className={styles.field}>
          <label>Senha</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
          {error && <span className={styles.error}>{error}</span>}
        </div>
        <button type="submit" className={styles.btnPrimary} disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p className={styles.switch}>
        Não tem conta? <button className={styles.link} onClick={onGoRegister}>Criar conta</button>
      </p>
    </div>
  );
}

export function RegisterPage({ onGoLogin }) {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', cpf: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => {
    let val = e.target.value;
    if (key === 'cpf') {
      val = val.replace(/\D/g,'');
      if (val.length > 9) val = val.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})/,'$1.$2.$3-$4');
      else if (val.length > 6) val = val.replace(/^(\d{3})(\d{3})(\d{0,3})/,'$1.$2.$3');
      else if (val.length > 3) val = val.replace(/^(\d{3})(\d{0,3})/,'$1.$2');
    }
    setForm(f => ({ ...f, [key]: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.cpf || !form.password) return setError('Preencha todos os campos');
    setLoading(true);
    try {
      await register(form.name, form.email, form.cpf, form.password);
      onGoLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <Logo />
      <h1 className={styles.title}>Criar conta</h1>
      <p className={styles.sub}>Junte-se ao FinBank hoje</p>

      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label>Nome completo</label>
          <input type="text" value={form.name} onChange={set('name')} placeholder="João Silva" />
        </div>
        <div className={styles.field}>
          <label>E-mail</label>
          <input type="email" value={form.email} onChange={set('email')} placeholder="seu@email.com" />
        </div>
        <div className={styles.field}>
          <label>CPF</label>
          <input type="text" value={form.cpf} onChange={set('cpf')} placeholder="000.000.000-00" maxLength={14} />
        </div>
        <div className={styles.field}>
          <label>Senha</label>
          <input type="password" value={form.password} onChange={set('password')} placeholder="Mínimo 6 caracteres" />
          {error && <span className={styles.error}>{error}</span>}
        </div>
        <button type="submit" className={styles.btnPrimary} disabled={loading}>
          {loading ? 'Criando conta...' : 'Criar conta'}
        </button>
      </form>

      <p className={styles.switch}>
        Já tem conta? <button className={styles.link} onClick={onGoLogin}>Entrar</button>
      </p>
    </div>
  );
}

function Logo() {
  return (
    <div className={styles.logo}>
      <div className={styles.logoMark}>
        <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
          <path d="M10 2L3 7v11h5v-6h4v6h5V7L10 2z" fill="#0a0a0f" />
        </svg>
      </div>
      <span className={styles.logoName}>FinBank</span>
    </div>
  );
}
