export interface TagInfo {
  id: string;
  label: string;
  shortLabel?: string;
  description?: string;
}

export const AVAILABLE_TAGS: TagInfo[] = [
  {
    id: 'Tecnología',
    label: 'Tecnología',
    shortLabel: 'Tech',
    description: 'Innovación, desarrollo de software, hardware y tendencias tecnológicas'
  },
  {
    id: 'Negocios y Emprendimiento',
    label: 'Negocios y Emprendimiento',
    shortLabel: 'Negocios',
    description: 'Startups, estrategias de negocio, emprendimiento y liderazgo'
  },
  {
    id: 'Arte y Creatividad',
    label: 'Arte y Creatividad',
    shortLabel: 'Arte',
    description: 'Diseño, arte visual, música, escritura y expresión creativa'
  },
  {
    id: 'Ciencia y Educación',
    label: 'Ciencia y Educación',
    shortLabel: 'Ciencia',
    description: 'Investigación, aprendizaje, métodos educativos y descubrimientos'
  },
  {
    id: 'Idiomas y Cultura',
    label: 'Idiomas y Cultura',
    shortLabel: 'Cultura',
    description: 'Aprendizaje de idiomas, diversidad cultural y tradiciones'
  },
  {
    id: 'Salud y Bienestar',
    label: 'Salud y Bienestar',
    shortLabel: 'Salud',
    description: 'Fitness, nutrición, salud mental y estilo de vida saludable'
  },
  {
    id: 'Deportes',
    label: 'Deportes',
    shortLabel: 'Deportes',
    description: 'Actividades deportivas, competencias y vida activa'
  },
  {
    id: 'Medio ambiente y Sostenibilidad',
    label: 'Medio ambiente y Sostenibilidad',
    shortLabel: 'Ambiente',
    description: 'Ecología, sostenibilidad y cuidado del medio ambiente'
  },
  {
    id: 'Desarrollo Personal',
    label: 'Desarrollo Personal',
    shortLabel: 'Desarrollo',
    description: 'Crecimiento personal, productividad y habilidades blandas'
  },
  {
    id: 'Video Juegos y Entretenimiento',
    label: 'Video Juegos y Entretenimiento',
    shortLabel: 'Gaming',
    description: 'Gaming, entretenimiento digital y cultura geek'
  }
];

export const FILTER_TAGS = [
  {
    id: 'all',
    label: 'Todos',
    shortLabel: 'Todos',
    description: 'Ver todos los posts sin filtro'
  },
  ...AVAILABLE_TAGS
];

export const getTagById = (id: string): TagInfo | undefined => {
  return AVAILABLE_TAGS.find(tag => tag.id === id);
};

export const getTagLabel = (id: string): string => {
  const tag = getTagById(id);
  return tag?.label || id;
};

export const getTagShortLabel = (id: string): string => {
  const tag = getTagById(id);
  return tag?.shortLabel || tag?.label || id;
};

export const isValidTag = (id: string): boolean => {
  return AVAILABLE_TAGS.some(tag => tag.id === id);
};

export const TAG_GRADIENT_MAP: Record<string, string> = {
  'all': 'bg-gradient-to-r from-purple-500 to-pink-500',
  'Tecnología': 'bg-gradient-to-r from-blue-500 to-cyan-500',
  'Negocios y Emprendimiento': 'bg-gradient-to-r from-green-500 to-emerald-500',
  'Arte y Creatividad': 'bg-gradient-to-r from-purple-500 to-violet-500',
  'Ciencia y Educación': 'bg-gradient-to-r from-orange-500 to-red-500',
  'Idiomas y Cultura': 'bg-gradient-to-r from-rose-500 to-pink-500',
  'Salud y Bienestar': 'bg-gradient-to-r from-emerald-500 to-teal-500',
  'Deportes': 'bg-gradient-to-r from-indigo-500 to-blue-500',
  'Medio ambiente y Sostenibilidad': 'bg-gradient-to-r from-teal-500 to-green-500',
  'Desarrollo Personal': 'bg-gradient-to-r from-yellow-500 to-orange-500',
  'Video Juegos y Entretenimiento': 'bg-gradient-to-r from-violet-500 to-purple-500'
};

export const getTagGradient = (id: string): string => {
  return TAG_GRADIENT_MAP[id] || 'bg-gradient-to-r from-slate-500 to-gray-500';
};