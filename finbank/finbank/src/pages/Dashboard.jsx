import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { contaService } from '../services/api';
import { TransactionItem } from '../components/TransactionItem';
import { Modal } from '../components/Modal';
import styles from './Dashboard.module.css';

export function Dashboard({ onToast, onNavigate }) {
  const { token } = useAuth();
  const [conta, setConta] = useState(null);
  const [resumo, setResumo] = useState(null);
  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // 'depositar' | 'sacar'
  const [value, setValue] = useState('');
  const [opError, setOpError] = useState('');
  const [opLoading, setOpLoading] = useState(false);

  const load = useCallback(async () => {
    try {
      const [c, r, e] = await Promise.all([
        contaService.getMinha(token),
        contaService.getResumo(token),
        contaService.getExtrato(token),
      ]);
      setConta(c);
      setResumo(r);
      setTxns(e.slice(0, 5));
    } catch (e) {
      onToast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [token, onToast]);

  useEffect(() => { load(); }, [load]);

  const greet = () => {
    const h = new Date().getHours();
    return h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
  };

  const openModal = (type) => { setModal(type); setValue(''); setOpError(''); };
  const closeModal = () => { setModal(null); setValue(''); setOpError(''); };

  const handleOp = async () => {
    const num = parseFloat(value);
    if (!num || num <= 0) return setOpError('Valor inválido');
    setOpLoading(true); setOpError('');
    try {
      if (modal === 'depositar') await contaService.depositar(num, token);
      else await contaService.sacar(num, token);
      onToast(`${modal === 'depositar' ? 'Depósito' : 'Saque'} realizado com sucesso!`, 'success');
      closeModal();
      await load();
    } catch (e) {
      setOpError(e.message);
    } finally {
      setOpLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>{greet()}</h1>
        <p className={styles.sub}>Aqui está o resumo da sua conta</p>
      </div>

      <div className={styles.balanceCard}>
        <div className={styles.balanceGlow} />
        <div className={styles.balanceLabel}>Saldo disponível</div>
        <div className={styles.balanceValue}>
          {loading ? '...' : Number(conta?.balance || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </div>
        <div className={styles.contaNum}>
          Conta <span>{conta?.ContaNumber || '——'}</span>
        </div>
      </div>

      <div className={styles.statGrid}>
        {[
          { label: 'Total depositado', val: resumo?.totalDepositado, color: 'green' },
          { label: 'Total sacado', val: resumo?.totalSacado, color: 'red' },
          { label: 'Transferências enviadas', val: resumo?.totalTransferido, color: 'red' },
          { label: 'Transferências recebidas', val: resumo?.totalRecebido, color: 'green' },
        ].map(s => (
          <div key={s.label} className={styles.statCard}>
            <div className={styles.statLabel}>{s.label}</div>
            <div className={`${styles.statVal} ${styles[s.color]}`}>{loading ? '—' : s.val}</div>
          </div>
        ))}
      </div>

      <div className={styles.actionGrid}>
        <button className={`${styles.actionBtn} ${styles.dep}`} onClick={() => openModal('depositar')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Depositar
        </button>
        <button className={`${styles.actionBtn} ${styles.saq}`} onClick={() => openModal('sacar')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24"><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Sacar
        </button>
        <button className={`${styles.actionBtn} ${styles.tra}`} onClick={() => onNavigate('transferir')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="24" height="24"><path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/></svg>
          Transferir
        </button>
      </div>

      <div className={styles.sectionTitle}>Últimas movimentações</div>
      <div className={styles.txnList}>
        {loading
          ? <div className={styles.empty}>Carregando...</div>
          : txns.length === 0
          ? <div className={styles.empty}>Nenhuma movimentação ainda</div>
          : txns.map((t, i) => <TransactionItem key={i} txn={t} />)
        }
      </div>

      {modal && (
        <Modal title={modal === 'depositar' ? 'Depositar' : 'Sacar'} onClose={closeModal}>
          <div className={styles.modalField}>
            <label>Valor (R$)</label>
            <input
              type="number"
              placeholder="0,00"
              step="0.01" min="0.01"
              value={value}
              onChange={e => setValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleOp()}
              autoFocus
            />
            {opError && <span className={styles.fieldError}>{opError}</span>}
          </div>
          <button className={styles.btnPrimary} onClick={handleOp} disabled={opLoading}>
            {opLoading ? 'Processando...' : modal === 'depositar' ? 'Depositar' : 'Sacar'}
          </button>
        </Modal>
      )}
    </div>
  );
}
