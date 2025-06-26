export type AuthMode = 'login' | 'register' | 'forgot';

export type UserRole = 'Mentor' | 'Colaborador';

export type UserInterest = 
  | 'Tecnología'
  | 'Negocios y Emprendimiento'
  | 'Arte y Creatividad'
  | 'Ciencia y Educación'
  | 'Idiomas y Cultura'
  | 'Salud y Bienestar'
  | 'Deportes'
  | 'Medio ambiente y Sostenibilidad'
  | 'Desarrollo Personal'
  | 'Video Juegos y Entretenimiento';

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole | '';
  interests: UserInterest[];
}

export interface AuthContextType {
  authMode: AuthMode;
  formData: FormData;
  isTransitioning: boolean;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  switchMode: (mode: AuthMode) => void;
}

// Interfaces para la API de registro
export interface RegisterRequest {
    name: string;
    secondName: string;
    email: string;
    password: string;
    role: UserRole;
    interests: UserInterest[];
}

export interface RegisterResponse {
    token: string;
    user: {
        id: number;
        name: string;
        secondName: string;
        email: string;
        role: UserRole;
        interests: UserInterest[];
    };
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    userId: number;
    name: string;
    secondName: string;
    email: string;
    role: UserRole;
    interests: UserInterest[];
}

export interface ForgotPasswordRequest {
    correo: string;
}

export interface ForgotPasswordResponse {
    mensaje: string;
    exito: boolean;
    correo?: string;
}