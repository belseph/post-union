import React from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { AuthInput } from './AuthInput';
import { UnifiedSelector } from './UnifiedSelector';
import { PasswordValidation } from './PasswordValidation';
import type { AuthMode, FormData, UserRole, UserInterest } from '../types/auth';

interface AuthFormProps {
  authMode: AuthMode;
  formData: FormData;
  showPassword: boolean;
  isTransitioning: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onTogglePassword: () => void;
  onSwitchMode: (mode: AuthMode) => void;
  onRoleChange: (role: UserRole) => void;
  onInterestToggle: (interest: UserInterest) => void;
  apiMessage: string | null;
  isError: boolean;
  isLoading: boolean;
  passwordValidation: { isValid: boolean; checks: Array<{ id: string; label: string; isValid: boolean }> };
}

export const AuthForm: React.FC<AuthFormProps> = ({
  authMode,
  formData,
  showPassword,
  isTransitioning,
  onInputChange,
  onSubmit,
  onTogglePassword,
  onSwitchMode,
  onRoleChange,
  onInterestToggle,
  apiMessage,
  isError,
  isLoading,
  passwordValidation
}) => {
  return (
    <div className="max-w-md mx-auto">
      <div className={`text-center mb-6 ${
        isTransitioning ? 'animate-slideOutDown' : 'animate-slideInUp'
      }`}>
        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
          {authMode === 'login' && 'Bienvenido de vuelta'}
          {authMode === 'register' && 'Únete a la comunidad'}
          {authMode === 'forgot' && 'Recupera tu cuenta'}
        </h3>
        <p className="text-white/70">
          {authMode === 'login' && 'Accede a tu panel de emprendedor'}
          {authMode === 'register' && 'Comienza tu viaje emprendedor'}
          {authMode === 'forgot' && 'Te ayudamos a recuperar el acceso'}
        </p>
      </div>

      <form onSubmit={onSubmit} className={`space-y-5 ${
        isTransitioning ? 'animate-fadeOutDown' : 'animate-fadeInUp'
      }`}>

        <div className={`overflow-hidden smooth-height ${
          authMode === 'register'
            ? 'max-h-24 opacity-100'
            : 'max-h-0 opacity-0'
        }`}>
          <div className="grid grid-cols-2 gap-4 mb-2">
            <AuthInput
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={onInputChange}
              placeholder="Nombre"
              icon={User}
              authMode={authMode}
              required={authMode === 'register'}
            />
            <AuthInput
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={onInputChange}
              placeholder="Apellido"
              icon={User}
              authMode={authMode}
              required={authMode === 'register'}
            />
          </div>
        </div>

        <div className={`overflow-hidden smooth-height ${
          authMode === 'register'
            ? 'max-h-32 opacity-100'
            : 'max-h-0 opacity-0'
        }`}>
          <div className="pb-1">
            <UnifiedSelector
              selectedRole={formData.role}
              selectedInterests={formData.interests}
              onRoleChange={onRoleChange}
              onInterestToggle={onInterestToggle}
              authMode={authMode}
            />
          </div>
        </div>

        <AuthInput
          type="email"
          name="email"
          value={formData.email}
          onChange={onInputChange}
          placeholder="Correo electrónico"
          icon={Mail}
          authMode={authMode}
          required
        />

        <div className={`overflow-hidden smooth-height ${
          authMode !== 'forgot'
            ? 'max-h-24 opacity-100'
            : 'max-h-0 opacity-0'
        }`}>
          <div className="space-y-1">
            <AuthInput
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={onInputChange}
              placeholder="Contraseña"
              icon={Lock}
              authMode={authMode}
              required={authMode !== 'forgot'}
              rightElement={
                <button
                  type="button"
                  onClick={onTogglePassword}
                  className="text-white/50 hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              }
            />
            <PasswordValidation 
              passwordValidation={passwordValidation}
              authMode={authMode} 
            />
          </div>
        </div>

        <div className={`overflow-hidden smooth-height ${
          authMode === 'login'
            ? 'max-h-10 opacity-100 mb-6'
            : 'max-h-0 opacity-0 mb-0'
        }`}>
          <div className="text-right">
            <button
              type="button"
              onClick={() => onSwitchMode('forgot')}
              className="text-purple-300 hover:text-purple-200 text-sm transition-colors duration-300 cursor-pointer"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </div>

        {apiMessage && (
            <p className={`text-center font-medium mt-4 ${isError ? 'text-red-400' : 'text-green-400'}`}>
                {apiMessage}
            </p>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading || (authMode === 'register' && (!formData.role || formData.interests.length === 0 || !passwordValidation.isValid))}
            className={`w-full font-semibold py-4 px-6 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center group cursor-pointer ${
              authMode === 'register'
                ? 'bg-gradient-to-r from-cyan-600 to-emerald-600 text-white hover:from-cyan-700 hover:to-emerald-700 focus:ring-cyan-400/20'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 focus:ring-purple-400/20'
            } ${(isLoading || (authMode === 'register' && (!formData.role || formData.interests.length === 0 || !passwordValidation.isValid))) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="mr-2">
              {isLoading ? (
                <span className="mr-2 inline-block animate-spin">⚙️</span>
              ) : null}
              {authMode === 'login' && (isLoading ? 'Iniciando Sesión...' : 'Iniciar Sesión')}
              {authMode === 'register' && (isLoading ? 'Registrando...' : 'Crear Cuenta')}
              {authMode === 'forgot' && (isLoading ? 'Enviando Enlace...' : 'Enviar Enlace')}
            </span>
            {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />}
          </button>
        </div>

        <div className="text-center pt-6 border-t border-white/10">
          {authMode === 'login' && (
            <p className="text-white/70">
              ¿No tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => onSwitchMode('register')}
                className="text-cyan-300 hover:text-cyan-200 font-semibold transition-colors duration-300 cursor-pointer"
              >
                Regístrate aquí
              </button>
            </p>
          )}
          {authMode === 'register' && (
            <p className="text-white/70">
              ¿Ya tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => onSwitchMode('login')}
                className="text-purple-300 hover:text-purple-200 font-semibold transition-colors duration-300 cursor-pointer"
              >
                Inicia sesión
              </button>
            </p>
          )}
          {authMode === 'forgot' && (
            <p className="text-white/70">
              ¿Recordaste tu contraseña?{' '}
              <button
                type="button"
                onClick={() => onSwitchMode('login')}
                className="text-purple-300 hover:text-purple-200 font-semibold transition-colors duration-300 cursor-pointer"
              >
                Volver al login
              </button>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};