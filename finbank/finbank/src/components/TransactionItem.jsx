import styles from './TransactionItem.module.css';

const icons = {
  deposito: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  saque: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  transferencia_enviada: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
  transferencia_recebida: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>,
};

const colorMap = {
  deposito: 'green',
  saque: 'red',
  transferencia_enviada: 'blue',
  transferencia_recebida: 'green',
};

export function TransactionItem({ txn }) {
  const isPos = txn.tipo.includes('Depósito') || txn.tipo.includes('recebida');
  const rawType = Object.keys(icons).find(k =>
    txn.tipo.toLowerCase().replace(' ', '_').includes(k.split('_')[0])
  ) || 'deposito';

  return (
    <div className={styles.txn}>
      <div className={styles.left}>
        <div className={`${styles.icon} ${styles[colorMap[rawType]]}`}>
          {icons[rawType]}
        </div>
        <div>
          <div className={styles.tipo}>{txn.tipo}</div>
          <div className={styles.desc}>{txn.descricao || txn.data}</div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={`${styles.amount} ${isPos ? styles.pos : styles.neg}`}>{txn.valor}</div>
        <div className={styles.date}>{txn.data}</div>
      </div>
    </div>
  );
}
