import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { contaService } from '../services/api';
import styles from './Transferir.module.css';

export function Transferir({ onToast }) {
  const { token } = useAuth();
  const [dest, setDest] = useState('');
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!dest) return setError('Informe o ID do destinatário');
    const num = parseFloat(value);
    if (!num || num <= 0) return setError('Valor inválido');

    setLoading(true);
    try {
      await contaService.transferir(parseInt(dest), num, token);
      onToast('Transferência realizada com sucesso!', 'success');
      setDest('');
      setValue('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Transferências</h1>
        <p className={styles.sub}>Envie dinheiro para outra conta</p>
      </div>

      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
            <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>
          </svg>
        </div>

        {success && (
          <div className={styles.successBanner}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg>
            Transferência realizada com sucesso!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>ID do usuário destinatário</label>
            <input
              type="number"
              placeholder="Ex: 3"
              value={dest}
              onChange={e => setDest(e.target.value)}
              min="1"
            />
            <span className={styles.hint}>O ID pode ser obtido com o destinatário</span>
          </div>
          <div className={styles.field}>
            <label>Valor (R$)</label>
            <input
              type="number"
              placeholder="0,00"
              step="0.01"
              min="0.01"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
            {error && <span className={styles.error}>{error}</span>}
          </div>
          <button type="submit" className={styles.btnPrimary} disabled={loading}>
            {loading ? 'Processando...' : 'Confirmar transferência'}
          </button>
        </form>
      </div>
    </div>
  );
}
