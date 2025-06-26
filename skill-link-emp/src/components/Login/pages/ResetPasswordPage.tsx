import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Lightbulb, Lock, Eye, EyeOff, ArrowRight, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { validateResetToken, resetPassword } from '../api/auth';
import { AuthInput } from '../components/AuthInput';
import { PasswordValidation } from '../components/PasswordValidation';

type PageState = 'loading' | 'valid' | 'invalid' | 'success' | 'error';

export const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [pageState, setPageState] = useState<PageState>('loading');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMessageError, setIsMessageError] = useState(false);

  const passwordValidation = React.useMemo(() => {
    const checks = [
      {
        id: 'length',
        label: 'Mín. 8 caracteres',
        isValid: password.length >= 8
      },
      {
        id: 'digit',
        label: 'Un dígito',
        isValid: /\d/.test(password)
      },
      {
        id: 'special',
        label: 'Un caracter especial',
        isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password)
      }
    ];

    const isValid = checks.every(check => check.isValid);
    return { isValid, checks };
  }, [password]);

  useEffect(() => {
    const validateTokenOnLoad = async () => {
      if (!token) {
        setPageState('invalid');
        setMessage('Enlace de recuperación no válido.');
        setIsMessageError(true);
        return;
      }

      try {
        const response = await validateResetToken(token);
        if (response.exito) {
          setPageState('valid');
          setUserEmail(response.correo || '');
        } else {
          setPageState('invalid');
          setMessage('Enlace no válido o expirado.');
          setIsMessageError(true);
        }
      } catch (error: any) {
        setPageState('invalid');
        setMessage('Enlace no válido o expirado.');
        setIsMessageError(true);
      }
    };

    validateTokenOnLoad();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordValidation.isValid) {
      setMessage('La contraseña no cumple con los requisitos.');
      setIsMessageError(true);
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      setIsMessageError(true);
      return;
    }

    if (!token) {
      setMessage('Enlace no válido.');
      setIsMessageError(true);
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    setIsMessageError(false);

    try {
      const response = await resetPassword(token, password);
      
      if (response.exito) {
        setPageState('success');
        setMessage(response.mensaje);
        setIsMessageError(false);
      } else {
        setPageState('error');
        setMessage(response.mensaje);
        setIsMessageError(true);
      }
    } catch (error: any) {
      setPageState('error');
      setMessage(error.message || 'Error al cambiar la contraseña.');
      setIsMessageError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md mx-auto relative z-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20 p-8">
          
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-2xl">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white ml-3">SkillLink</h1>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
              {pageState === 'loading' && 'Validando enlace...'}
              {pageState === 'valid' && 'Cambiar contraseña'}
              {pageState === 'invalid' && 'Enlace no válido'}
              {pageState === 'success' && '¡Contraseña cambiada!'}
              {pageState === 'error' && 'Error al cambiar contraseña'}
            </h2>

            {userEmail && pageState === 'valid' && (
              <p className="text-white/70 text-sm">
                Cuenta asociada a <span className="text-cyan-300">{userEmail}</span>
              </p>
            )}
          </div>

          {pageState === 'loading' && (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-white/70">Validando enlace de recuperación...</p>
            </div>
          )}

          {pageState === 'invalid' && (
            <div className="text-center py-8">
              <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <p className="text-red-400 mb-6">{message}</p>
              <button
                onClick={handleBackToLogin}
                className="w-full bg-gradient-to-r cursor-pointer from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver al login
              </button>
            </div>
          )}

          {pageState === 'success' && (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <p className="text-green-400 mb-6">{message}</p>
              <button
                onClick={handleBackToLogin}
                className="w-full bg-gradient-to-r cursor-pointer from-green-600 to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Ir al login
              </button>
            </div>
          )}

          {pageState === 'error' && (
            <div className="text-center py-8">
              <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <p className="text-red-400 mb-6">{message}</p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setPageState('valid');
                    setPassword('');
                    setConfirmPassword('');
                    setMessage('');
                    setIsMessageError(false);
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Intentar de nuevo
                </button>
                <button
                  onClick={handleBackToLogin}
                  className="w-full bg-white/10 cursor-pointer text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/15 transition-all duration-300 flex items-center justify-center"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Volver al login
                </button>
              </div>
            </div>
          )}

          {pageState === 'valid' && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <AuthInput
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nueva contraseña"
                  icon={Lock}
                  authMode="register"
                  required
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-white/50 hover:text-white transition-colors duration-300 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  }
                />
                <PasswordValidation 
                  passwordValidation={passwordValidation}
                  authMode="register" 
                />
              </div>

              <AuthInput
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmar nueva contraseña"
                icon={Lock}
                authMode="register"
                required
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-white/50 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                }
              />

              {confirmPassword && (
                <div className={`text-sm flex items-center space-x-2 ${
                  password === confirmPassword ? 'text-green-400' : 'text-red-400'
                }`}>
                  {password === confirmPassword ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                  <span>
                    {password === confirmPassword ? 'Las contraseñas coinciden' : 'Las contraseñas no coinciden'}
                  </span>
                </div>
              )}

              {message && isMessageError && (
                <p className="text-red-400 text-center font-medium">{message}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !passwordValidation.isValid || password !== confirmPassword}
                className={`w-full font-semibold py-4 px-6 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center group cursor-pointer bg-gradient-to-r from-cyan-600 to-emerald-600 text-white hover:from-cyan-700 hover:to-emerald-700 focus:ring-cyan-400/20 ${
                  (isSubmitting || !passwordValidation.isValid || password !== confirmPassword) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span className="mr-2">
                  {isSubmitting ? (
                    <span className="mr-2 animate-spin">⚙️</span>
                  ) : null}
                  {isSubmitting ? 'Cambiando contraseña...' : 'Cambiar contraseña'}
                </span>
                {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />}
              </button>

              <div className="text-center pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="text-purple-300 hover:text-purple-200 font-semibold transition-colors duration-300 cursor-pointer flex items-center justify-center mx-auto"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-32 right-32 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-20 w-1 h-1 bg-white rounded-full animate-ping animation-delay-1000"></div>
    </div>
  );
};