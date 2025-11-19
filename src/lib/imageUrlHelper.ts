/**
 * Helper para converter URLs de imagens para URLs absolutas
 */

/**
 * Converte uma URL de imagem relativa para absoluta
 * Em desenvolvimento com Vite, usa URL relativa (Vite faz proxy)
 * Em produção, usa URL relativa do mesmo domínio
 */
export function getAbsoluteImageUrl(relativePath: string): string {
  // Se for vazio ou undefined, retornar vazio
  if (!relativePath) {
    return '';
  }

  // Se já for uma URL completa, retornar como está
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }

  // Se for um asset local (começando com @ ou src/), retornar como está
  if (relativePath.startsWith('@/') || relativePath.startsWith('src/')) {
    return relativePath;
  }

  // Se não começar com /, adicionar
  const path = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;

  // Em desenvolvimento ou produção, usar URL relativa
  // O Vite tem proxy configurado para /uploads -> localhost:3000
  return path;
}

/**
 * Hook para converter URLs de veículos
 */
export function normalizeVehicleImages<T extends { image: string }>(vehicles: T[]): T[] {
  return vehicles.map(vehicle => ({
    ...vehicle,
    image: getAbsoluteImageUrl(vehicle.image)
  }));
}
