import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  userId: string;
  name: string;
  secondName: string;
  email: string;
  role: string;
  interests: string[];
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

// Validar que el token JWT esté presente y no expirado
function isTokenValid(token: string): boolean {
  try {
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return false;
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    if (!payload.exp) return false;

    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
  } catch {
    return false;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const isLoggedIn = !!user;

  useEffect(() => {
    const token = sessionStorage.getItem('jwt_token');
    const userInfo = sessionStorage.getItem('user_info');

    if (token && userInfo && isTokenValid(token)) {
      setUser(JSON.parse(userInfo));
    } else {
      sessionStorage.removeItem('jwt_token');
      sessionStorage.removeItem('user_info');
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'jwt_token' || e.key === 'user_info') {
        const token = sessionStorage.getItem('jwt_token');
        const userInfo = sessionStorage.getItem('user_info');

        if (token && userInfo && isTokenValid(token)) {
          setUser(JSON.parse(userInfo));
        } else {
          sessionStorage.removeItem('jwt_token');
          sessionStorage.removeItem('user_info');
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (userData: User, token: string) => {
    sessionStorage.setItem('jwt_token', token);
    sessionStorage.setItem('user_info', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    sessionStorage.removeItem('jwt_token');
    sessionStorage.removeItem('user_info');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
