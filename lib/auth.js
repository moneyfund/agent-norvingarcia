'use client';

const AUTH_KEY = 'ng_auth';
const defaultUser = {
  email: 'admin@norvingarcia.com',
  password: 'Admin123*'
};

export const authService = {
  login: (email, password) => {
    if (email === defaultUser.email && password === defaultUser.password) {
      window.localStorage.setItem(AUTH_KEY, 'true');
      return { ok: true };
    }

    return { ok: false, message: 'Credenciales inválidas.' };
  },
  logout: () => {
    window.localStorage.removeItem(AUTH_KEY);
  },
  isAuthenticated: () => window.localStorage.getItem(AUTH_KEY) === 'true'
};
