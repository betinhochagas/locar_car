/**
 * AuthManager - Gerenciador de Autenticação
 */

const getAuthApiUrl = (): string => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace('vehicles.php', 'auth.php');
  }
  
  if (import.meta.env.PROD) {
    return '/rvcar/api/auth.php';
  }
  
  const hostname = window.location.hostname;
  return `http://${hostname}:3000/api/auth.php`;
};

const AUTH_API_URL = getAuthApiUrl();

interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: number;
    username: string;
    name: string;
  };
  expires_at: string;
}

interface VerifyResponse {
  valid: boolean;
  user: {
    id: number;
    username: string;
    name: string;
  };
  expires_at: string;
}

interface ChangePasswordResponse {
  success: boolean;
  message: string;
  token: string;
  expires_at: string;
}

const TOKEN_KEY = 'rvcar_admin_token';
const USER_KEY = 'rvcar_admin_user';

/**
 * Realizar login
 */
export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(AUTH_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'login', username, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro ao fazer login');
  }

  const data: LoginResponse = await response.json();
  
  // Salvar token e dados do usuário
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  
  return data;
};

/**
 * Verificar se token é válido
 */
export const verifyToken = async (token: string): Promise<VerifyResponse> => {
  const response = await fetch(AUTH_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'verify_token', token }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Token inválido');
  }

  return response.json();
};

/**
 * Alterar senha
 */
export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<ChangePasswordResponse> => {
  const token = getToken();
  if (!token) {
    throw new Error('Usuário não autenticado');
  }

  const response = await fetch(AUTH_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'change_password',
      token,
      current_password: currentPassword,
      new_password: newPassword,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro ao alterar senha');
  }

  const data: ChangePasswordResponse = await response.json();
  
  // Atualizar token
  localStorage.setItem(TOKEN_KEY, data.token);
  
  return data;
};

/**
 * Fazer logout
 */
export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem('rvcar_admin_auth'); // Remover flag antiga
};

/**
 * Obter token armazenado
 */
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Obter dados do usuário armazenado
 */
export const getUser = (): any | null => {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

/**
 * Verificar se está autenticado
 */
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

/**
 * Obter header de autorização
 */
export const getAuthHeader = (): Record<string, string> => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
