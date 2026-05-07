import { createContext, useContext, useState, useCallback } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('finbank_token'));
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('finbank_user')); } catch { return null; }
  });

  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password);
    const payload = JSON.parse(atob(data.token.split('.')[1]));
    const u = { id: payload.id, email: payload.email };
    setToken(data.token);
    setUser(u);
    localStorage.setItem('finbank_token', data.token);
    localStorage.setItem('finbank_user', JSON.stringify(u));
    return u;
  }, []);

  const register = useCallback(async (name, email, cpf, password) => {
    return authService.register(name, email, cpf, password);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('finbank_token');
    localStorage.removeItem('finbank_user');
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
