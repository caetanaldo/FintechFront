import styles from './Toast.module.css';

export function ToastContainer({ toasts, onRemove }) {
  return (
    <div className={styles.container}>
      {toasts.map(t => (
        <div key={t.id} className={`${styles.toast} ${styles[t.type]}`}>
          <span className={styles.icon}>{t.type === 'success' ? '✓' : '✕'}</span>
          <span>{t.message}</span>
          <button className={styles.close} onClick={() => onRemove(t.id)}>✕</button>
        </div>
      ))}
    </div>
  );
}
