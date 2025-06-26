import { Mentorship, Project, Session, Notification } from '../types';
import { IPost } from '../types/IPost';

export const mockMentorships: Mentorship[] = [
  {
    id: '1',
    mentee: {
      name: 'Ana García',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      project: 'EcoTech Solutions'
    },
    status: 'active',
    progress: 75,
    nextSession: '2025-01-20 14:00',
    hoursCompleted: 18,
    totalHours: 24
  },
  {
    id: '2',
    mentee: {
      name: 'Carlos Mendez',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      project: 'FinanceApp Pro'
    },
    status: 'active',
    progress: 45,
    nextSession: '2025-01-21 10:00',
    hoursCompleted: 12,
    totalHours: 20
  },
  {
    id: '3',
    mentee: {
      name: 'Sofia Rodriguez',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      project: 'HealthTracker'
    },
    status: 'active',
    progress: 90,
    nextSession: '2025-01-22 16:00',
    hoursCompleted: 22,
    totalHours: 25
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'AI Learning Platform',
    description: 'Plataforma de aprendizaje personalizado con IA',
    status: 'development',
    progress: 65,
    teamMembers: 4,
    mentor: {
      name: 'Dr. María López',
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      specialty: 'EdTech & AI'
    },
    daysUntilPitch: 45
  },
  {
    id: '2',
    name: 'Sustainable Fashion',
    description: 'Marketplace de moda sostenible',
    status: 'validation',
    progress: 80,
    teamMembers: 3,
    mentor: {
      name: 'Isabella Chen',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      specialty: 'Retail & Sustainability'
    },
    daysUntilPitch: 30
  }
];

export const mockSessions: Session[] = [
  {
    id: '1',
    type: 'mentoring',
    title: 'Weekly Review - EcoTech',
    time: '14:00',
    participants: ['Ana García']
  },
  {
    id: '2',
    type: 'team-meeting',
    title: 'Sprint Planning',
    time: '16:30',
    participants: ['Team AI Platform']
  },
  {
    id: '3',
    type: 'pitch-practice',
    title: 'Pitch Rehearsal',
    time: '18:00',
    participants: ['Sofia Rodriguez']
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'info',
    message: 'Nueva solicitud de mentoría recibida',
    time: '2 min',
    read: false
  },
  {
    id: '2',
    type: 'success',
    message: 'Sesión completada con Ana García',
    time: '1 hora',
    read: false
  },
  {
    id: '3',
    type: 'warning',
    message: 'Recordatorio: Reunión en 30 minutos',
    time: '30 min',
    read: true
  }
];

export const mockPosts: IPost[] = [
  {
    id: '1',
    title: 'Cómo construir un MVP en 30 días',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    description: 'Comparto mi experiencia construyendo un MVP para mi startup de fintech. Los desafíos, aprendizajes y herramientas que me ayudaron a lanzar en tiempo récord.',
    author: 'María González',
    authorRole: 'Fundadora de FinTechPro',
    authorImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    date: '2025-01-15',
    likes: 124,
    comments: 18,
    tags: ['startup', 'validación', 'negocio']
  },
  {
    id: '2',
    title: 'Lecciones aprendidas de mi primer pitch a inversores',
    image: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    description: 'Después de presentar mi startup a 15 inversores, aquí están las 5 lecciones más importantes que aprendí sobre cómo preparar y ejecutar un pitch exitoso.',
    author: 'Carlos Mendoza',
    authorRole: 'CEO de EcoSolutions',
    authorImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    date: '2025-01-14',
    likes: 89,
    comments: 12,
    tags: ['startup', 'validación', 'negocio']
  },
  {
    id: '3',
    title: 'Herramientas gratuitas para emprendedores',
    image: 'https://images.pexels.com/photos/3183156/pexels-photo-3183156.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    description: 'Una lista completa de herramientas gratuitas que uso diariamente para gestionar mi startup. Desde gestión de proyectos hasta marketing digital.',
    author: 'Ana Rodríguez',
    authorRole: 'Mentora de Startups',
    authorImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    date: '2025-01-13',
    likes: 156,
    comments: 23,
    tags: ['startup', 'validación', 'negocio']
  },
  {
    id: '4',
    title: 'Cómo validar tu idea de negocio sin gastar dinero',
    image: 'https://images.pexels.com/photos/3183159/pexels-photo-3183159.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    description: 'Estrategias probadas para validar tu idea de negocio antes de invertir tiempo y dinero. Métodos que he usado personalmente con éxito.',
    author: 'Luis Fernández',
    authorRole: 'Consultor de Innovación',
    authorImage: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    date: '2025-01-12',
    likes: 203,
    comments: 31,
    tags: ['startup', 'validación', 'negocio']
  },
  {
    id: '5',
    title: 'Construyendo un equipo remoto efectivo',
    image: 'https://images.pexels.com/photos/3183162/pexels-photo-3183162.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    description: 'Mi experiencia liderando un equipo de 8 personas en 4 países diferentes. Las mejores prácticas para comunicación, productividad y cultura de equipo.',
    author: 'Sofia Chen',
    authorRole: 'CTO de TechStart',
    authorImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    date: '2025-01-11',
    likes: 167,
    comments: 19,
    tags: ['equipo', 'remoto', 'productividad']
  }
];