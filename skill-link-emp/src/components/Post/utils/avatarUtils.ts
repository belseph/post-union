export const AVATAR_IMAGES = [
  // 👨‍💼 Profesionales y emprendedores
  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150',
  
  // 👩‍💼 Mujeres profesionales
  'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150',
  
  // 🧑‍🎓 Jóvenes emprendedores
  'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=150',
];

/**
 * Obtiene un avatar consistente basado en el ID del usuario
 * Esto asegura que el mismo usuario siempre tenga el mismo avatar
 */
export const getUserAvatar = (userId: string | number): string => {
  const numericId = typeof userId === 'string' ? parseInt(userId) : userId;
  const index = numericId % AVATAR_IMAGES.length;
  return AVATAR_IMAGES[index];
};

/**
 * Obtiene un avatar por orden de llegada (para nuevos usuarios)
 * Útil cuando no tienes un ID específico pero quieres variedad
 */
export const getAvatarByOrder = (order: number): string => {
  const index = order % AVATAR_IMAGES.length;
  return AVATAR_IMAGES[index];
};

/**
 * Obtiene un avatar aleatorio
 */
export const getRandomAvatar = (): string => {
  const randomIndex = Math.floor(Math.random() * AVATAR_IMAGES.length);
  return AVATAR_IMAGES[randomIndex];
};

/**
 * Obtiene el avatar por defecto (el primero de la lista)
 */
export const getDefaultAvatar = (): string => {
  return AVATAR_IMAGES[0];
};