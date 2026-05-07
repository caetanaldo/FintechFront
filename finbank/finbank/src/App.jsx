import { useState, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import { Dashboard } from './pages/Dashboard';
import { Extrato } from './pages/Extrato';
import { Transferir } from './pages/Transferir';
import { Sidebar } from './components/Sidebar';
import { ToastContainer } from './components/Toast';
import { useToast } from './hooks/useToast';
import './index.css';

function AppInner() {
  const { isAuthenticated } = useAuth();
  const [authView, setAuthView] = useState('login'); // 'login' | 'register'
  const [page, setPage] = useState('dashboard');
  const { toasts, addToast, removeToast } = useToast();

  const handleLoginSuccess = useCallback(() => setPage('dashboard'), []);

  if (!isAuthenticated) {
    return (
      <div className="auth-wrap">
        <div className="auth-bg" />
        {authView === 'login'
          ? <LoginPage onGoRegister={() => setAuthView('register')} onSuccess={handleLoginSuccess} />
          : <RegisterPage onGoLogin={() => setAuthView('login')} />
        }
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    );
  }

  const pages = {
    dashboard: <Dashboard onToast={addToast} onNavigate={setPage} />,
    extrato: <Extrato onToast={addToast} />,
    transferir: <Transferir onToast={addToast} />,
  };

  return (
    <div className="app">
      <Sidebar activePage={page} onNavigate={setPage} />
      <main className="main">
        {pages[page] || pages.dashboard}
      </main>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
