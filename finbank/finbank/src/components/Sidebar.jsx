import { useAuth } from '../context/AuthContext';
import styles from './Sidebar.module.css';

const Logo = () => (
  <div className={styles.logo}>
    <div className={styles.logoMark}>
      <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
        <path d="M10 2L3 7v11h5v-6h4v6h5V7L10 2z" fill="#0a0a0f" />
      </svg>
    </div>
    <span className={styles.logoName}>FinBank</span>
  </div>
);

const navItems = [
  {
    key: 'dashboard', label: 'Visão geral',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>
  },
  {
    key: 'extrato', label: 'Extrato',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>
  },
  {
    key: 'transferir', label: 'Transferências',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18"><path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/></svg>
  },
];

export function Sidebar({ activePage, onNavigate }) {
  const { user, logout } = useAuth();
  const initial = user?.email?.charAt(0).toUpperCase() || '?';

  return (
    <aside className={styles.sidebar}>
      <Logo />

      <nav className={styles.nav}>
        {navItems.map(item => (
          <button
            key={item.key}
            className={`${styles.navItem} ${activePage === item.key ? styles.active : ''}`}
            onClick={() => onNavigate(item.key)}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div className={styles.footer}>
        <div className={styles.userChip}>
          <div className={styles.avatar}>{initial}</div>
          <div>
            <div className={styles.userName}>Minha conta</div>
            <div className={styles.userEmail}>{user?.email || '—'}</div>
          </div>
        </div>
        <button className={styles.logoutBtn} onClick={logout}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
          </svg>
          Sair
        </button>
      </div>
    </aside>
  );
}
