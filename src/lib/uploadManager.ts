/**
 * UploadManager - Gerenciador de Upload de Imagens
 */

const getUploadApiUrl = (): string => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace('vehicles.php', 'upload.php');
  }
  
  if (import.meta.env.PROD) {
    return '/rvcar/api/upload.php';
  }
  
  const hostname = window.location.hostname;
  return `http://${hostname}:3000/api/upload.php`;
};

const UPLOAD_API_URL = getUploadApiUrl();

interface UploadResponse {
  success: boolean;
  url: string;
  filename: string;
  size: number;
  type: string;
}

/**
 * Fazer upload de imagem
 */
export const uploadImage = async (file: File): Promise<string> => {
  // Validar tipo de arquivo
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Tipo de arquivo não permitido. Use JPG, PNG ou WebP.');
  }

  // Validar tamanho (5MB)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error('Arquivo muito grande. Máximo: 5MB');
  }

  // Criar FormData
  const formData = new FormData();
  formData.append('image', file);

  // Fazer upload
  const response = await fetch(UPLOAD_API_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro ao fazer upload');
  }

  const data: UploadResponse = await response.json();
  
  // Retornar URL completa da imagem
  return data.url;
};

/**
 * Validar imagem antes do upload
 */
export const validateImage = (file: File): { valid: boolean; error?: string } => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024;

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Tipo de arquivo não permitido. Use JPG, PNG ou WebP.' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'Arquivo muito grande. Máximo: 5MB' };
  }

  return { valid: true };
};

/**
 * Criar preview da imagem
 */
export const createImagePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    
    reader.onerror = () => {
      reject(new Error('Erro ao ler arquivo'));
    };
    
    reader.readAsDataURL(file);
  });
};
