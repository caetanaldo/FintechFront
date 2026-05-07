import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { contaService } from '../services/api';
import { TransactionItem } from '../components/TransactionItem';
import styles from './Extrato.module.css';

export function Extrato({ onToast }) {
  const { token } = useAuth();
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    contaService.getExtrato(token)
      .then(setTxns)
      .catch(e => onToast(e.message, 'error'))
      .finally(() => setLoading(false));
  }, [token, onToast]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Extrato</h1>
        <p className={styles.sub}>Histórico completo de movimentações</p>
      </div>

      <div className={styles.list}>
        {loading
          ? <div className={styles.empty}>Carregando...</div>
          : txns.length === 0
          ? <div className={styles.empty}>Nenhuma movimentação ainda</div>
          : txns.map((t, i) => <TransactionItem key={i} txn={t} />)
        }
      </div>
    </div>
  );
}
