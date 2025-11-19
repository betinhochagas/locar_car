import { Vehicle } from '@/types/admin';
import { getAuthHeader } from './authManager';

// Detectar automaticamente a URL base do ambiente
const getApiUrl = (): string => {
  // Se houver variável de ambiente, usa ela
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Em produção, usa URL relativa (mesmo domínio)
  if (import.meta.env.PROD) {
    return '/api/vehicles.php';
  }
  
  // Em desenvolvimento, detectar se está acessando via IP da rede local
  const hostname = window.location.hostname;
  
  // Se for localhost ou 127.0.0.1, usar localhost
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:3000/api/vehicles.php';
  }
  
  // Se for IP da rede local (192.168.x.x, 10.x.x.x), usar o mesmo IP
  if (hostname.match(/^(192\.168\.|10\.)/)) {
    return `http://${hostname}:3000/api/vehicles.php`;
  }
  
  // Fallback para localhost
  return 'http://localhost:3000/api/vehicles.php';
};

const API_URL = getApiUrl();

// Debug logs only in development
if (import.meta.env.DEV) {
  console.log('VehicleManager - API URL:', API_URL);
  console.log('Environment:', import.meta.env.MODE);
}

const fetchAPI = async <T = unknown>(endpoint: string = '', options: RequestInit = {}): Promise<T> => {
  const url = endpoint ? `${API_URL}?${endpoint}` : API_URL;
  
  if (import.meta.env.DEV) {
    console.log(`[VehicleManager] Fetching: ${url}`);
  }
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
        ...(options.headers || {}),
      },
      mode: 'cors',
      credentials: 'omit',
    });
    
    if (import.meta.env.DEV) {
      console.log(`[VehicleManager] Response status: ${response.status}`);
    }
    
    if (!response.ok) {
      const errorText = await response.text();
      if (import.meta.env.DEV) {
        console.error(`[VehicleManager] Error response:`, errorText);
      }
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    if (import.meta.env.DEV) {
      console.log(`[VehicleManager] Success! Received ${Array.isArray(data) ? data.length : 1} item(s)`);
    }
    return data;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error(`[VehicleManager] Fetch error:`, error);
    }
    throw error;
  }
};

interface RawVehicleData {
  id: string | number;
  name: string;
  price: string;
  image: string;
  features?: string[];
  available?: boolean | number;
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
}

export const getVehicles = async (): Promise<Vehicle[]> => {
  const data = await fetchAPI<RawVehicleData[]>();
  return data.map((v) => ({
    id: String(v.id), name: v.name, price: v.price, image: v.image,
    features: Array.isArray(v.features) ? v.features : [],
    available: Boolean(v.available),
    createdAt: v.created_at || v.createdAt || new Date().toISOString(),
    updatedAt: v.updated_at || v.updatedAt || new Date().toISOString(),
  }));
};

export const addVehicle = async (vehicle: Omit<Vehicle, 'id' | 'createdAt' | 'updatedAt'>): Promise<Vehicle> => {
  const data = await fetchAPI('', {
    method: 'POST',
    body: JSON.stringify({ ...vehicle, available: vehicle.available ?? true }),
  });
  return { ...data, id: String(data.id), features: data.features || [] };
};

export const updateVehicle = async (id: string, updates: Partial<Vehicle>): Promise<Vehicle | null> => {
  const data = await fetchAPI(`id=${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
  return { ...data, id: String(data.id), features: data.features || [] };
};

export const deleteVehicle = async (id: string): Promise<boolean> => {
  await fetchAPI(`id=${id}`, { method: 'DELETE' });
  return true;
};

export const toggleVehicleAvailability = async (id: string): Promise<Vehicle | null> => {
  const data = await fetchAPI(`id=${id}`, { method: 'PATCH' });
  return { ...data, id: String(data.id), features: data.features || [] };
};
