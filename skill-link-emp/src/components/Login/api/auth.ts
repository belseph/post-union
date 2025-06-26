import type {
    RegisterRequest,
    RegisterResponse,
    LoginRequest,
    AuthResponse,
    ForgotPasswordRequest,
    ForgotPasswordResponse
} from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://skill-link-emprendedor-pjof.onrender.com';

export const registerUser = async (userData: RegisterRequest): Promise<RegisterResponse> => {
    try {
        console.log('🚀 Enviando petición de registro a:', `${API_BASE_URL}/usuarios/register`);
        
        const response = await fetch(`${API_BASE_URL}/usuarios/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(userData),
        });

        console.log('📡 Respuesta del servidor:', response.status, response.statusText);

        if (!response.ok) {
            let errorMessage = 'Error desconocido al registrar el usuario.';
            try {
                const errorBody = await response.json();
                console.error('❌ Error del servidor:', errorBody);
                errorMessage = errorBody.error || errorBody.message || `Error ${response.status}: ${response.statusText}`;
            } catch (jsonError) {
                console.error('❌ Error parseando respuesta JSON:', jsonError);
                switch (response.status) {
                    case 400:
                        errorMessage = 'Datos de registro inválidos. Verifica la información ingresada.';
                        break;
                    case 409:
                        errorMessage = 'El email ya está registrado. Intenta con otro email.';
                        break;
                    case 500:
                        errorMessage = 'Error interno del servidor. Inténtalo de nuevo más tarde.';
                        break;
                    default:
                        errorMessage = `Error ${response.status}: ${response.statusText}`;
                }
            }
            throw new Error(errorMessage);
        }

        const data: RegisterResponse = await response.json();
        console.log('✅ Registro exitoso:', data);
        
        // Guardar token y datos del usuario automáticamente
        sessionStorage.setItem('jwt_token', data.token);
        sessionStorage.setItem('user_info', JSON.stringify(data.user));
        
        return data;
    } catch (error) {
        console.error('💥 Error en la llamada a la API de registro:', error);
        throw error;
    }
};

export const loginUser = async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
        console.log('🚀 Enviando petición de login a:', `${API_BASE_URL}/usuarios/login`);
        
        const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(credentials),
        });

        console.log('📡 Respuesta del servidor:', response.status, response.statusText);

        if (!response.ok) {
            let errorMessage = 'Error desconocido al iniciar sesión.';
            try {
                const errorBody = await response.json();
                console.error('❌ Error del servidor:', errorBody);
                errorMessage = errorBody.error || errorBody.message || `Error ${response.status}: ${response.statusText}`;
            } catch (jsonError) {
                console.error('❌ Error parseando respuesta JSON:', jsonError);
                switch (response.status) {
                    case 401:
                        errorMessage = 'Email o contraseña incorrectos. Verifica tus credenciales.';
                        break;
                    case 403:
                        errorMessage = 'Acceso denegado. Tu cuenta puede estar desactivada.';
                        break;
                    case 404:
                        errorMessage = 'Usuario no encontrado. Verifica tu email.';
                        break;
                    case 500:
                        errorMessage = 'Error interno del servidor. Inténtalo de nuevo más tarde.';
                        break;
                    default:
                        errorMessage = `Error de conexión. Código: ${response.status}`;
                }
            }
            throw new Error(errorMessage);
        }

        const data: AuthResponse = await response.json();
        console.log('✅ Login exitoso:', data);

        // Guardar token y datos del usuario
        sessionStorage.setItem('jwt_token', data.token);
        sessionStorage.setItem('user_info', JSON.stringify({
            userId: data.userId,
            name: data.name,
            secondName: data.secondName,
            email: data.email,
            role: data.role,
            interests: data.interests
        }));

        return data;
    } catch (error) {
        console.error('💥 Error en la llamada a la API de login:', error);
        throw error;
    }
};

export const forgotPassword = async (email: string): Promise<ForgotPasswordResponse> => {
    try {
        const requestData: ForgotPasswordRequest = {
            correo: email
        };

        const response = await fetch(`${API_BASE_URL}/usuarios/recover-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            let errorMessage = 'Error al solicitar recuperación de contraseña.';
            try {
                const errorBody = await response.json();
                errorMessage = errorBody.mensaje || errorBody.message || `Error ${response.status}: ${response.statusText}`;
            } catch (jsonError) {
                switch (response.status) {
                    case 404:
                        errorMessage = 'No se encontró una cuenta con ese email.';
                        break;
                    case 500:
                        errorMessage = 'Error interno del servidor. Inténtalo de nuevo más tarde.';
                        break;
                    default:
                        errorMessage = `Error ${response.status}: ${response.statusText}`;
                }
            }
            throw new Error(errorMessage);
        }

        const data: ForgotPasswordResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error en la llamada a la API de recuperación:', error);
        throw error;
    }
};

export const validateResetToken = async (token: string): Promise<ForgotPasswordResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/usuarios/validate-reset-token?token=${encodeURIComponent(token)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            let errorMessage = 'Token inválido o expirado.';
            try {
                const errorBody = await response.json();
                errorMessage = errorBody.mensaje || errorBody.message || `Error ${response.status}: ${response.statusText}`;
            } catch (jsonError) {
                errorMessage = 'Token inválido o expirado.';
            }
            throw new Error(errorMessage);
        }

        const data: ForgotPasswordResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error en la validación del token:', error);
        throw error;
    }
};

export const resetPassword = async (token: string, newPassword: string): Promise<ForgotPasswordResponse> => {
    try {
        const requestData = {
            token: token,
            nuevaContra: newPassword
        };

        const response = await fetch(`${API_BASE_URL}/usuarios/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            let errorMessage = 'Error al cambiar la contraseña.';
            try {
                const errorBody = await response.json();
                errorMessage = errorBody.mensaje || errorBody.message || `Error ${response.status}: ${response.statusText}`;
            } catch (jsonError) {
                errorMessage = 'Error al cambiar la contraseña.';
            }
            throw new Error(errorMessage);
        }

        const data: ForgotPasswordResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error en el cambio de contraseña:', error);
        throw error;
    }
};

export const fetchAuthenticated = async <T>(
    url: string,
    options?: RequestInit
): Promise<T> => {
    const token = sessionStorage.getItem('jwt_token');

    if (!token) {
        console.error('No se encontró token de autenticación en sessionStorage. Redirigiendo al login...');
        throw new Error('Expiró su sesión. Vuelve a ingresar con sus credenciales.');
    }

    const headers = {
        ...(options?.headers || {}),
        'Authorization': `Bearer ${token}`,
    };

    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers,
        credentials: 'include',
    });

    if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            console.error('Token inválido, expirado o permisos insuficientes. Limpiando sesión...');
            sessionStorage.removeItem('jwt_token');
            sessionStorage.removeItem('user_info');
            throw new Error('Autenticación fallida. Por favor, inicia sesión de nuevo.');
        }

        let errorMessage = 'Error desconocido en petición autenticada.';
        try {
            const errorBody = await response.json();
            errorMessage = errorBody.message || errorBody.error || `Error ${response.status}: ${response.statusText}`;
        } catch (jsonError) {
            errorMessage = `Error ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
    }

    const data: T = await response.json();
    return data;
};

export const logoutUser = (): void => {
    sessionStorage.removeItem('jwt_token');
    sessionStorage.removeItem('user_info');
};