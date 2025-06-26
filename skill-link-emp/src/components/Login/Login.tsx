import { Lightbulb } from 'lucide-react';
import { useAuthTransition } from './hooks/useAuthTransition';
import { AuthBackground } from './components/AuthBackground';
import { AuthForm } from './components/AuthForm';

import './index.css';

export const Login: React.FC = () => {
  const {
    authMode,
    formData,
    isTransitioning,
    showPassword,
    setShowPassword,
    handleInputChange,
    handleRoleChange,
    handleInterestToggle,
    handleSubmit,
    switchMode,
    apiMessage,
    isError,
    isLoading,
    passwordValidation
  } = useAuthTransition();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto flex items-center justify-center relative z-10">
        <div className={`flex w-full max-w-5xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20 relative smooth-container ${
          authMode === 'register' 
            ? 'min-h-[650px]'
            : authMode === 'forgot' 
              ? 'min-h-[480px]'
              : 'min-h-[520px]'
        }`}>
          
          <AuthBackground authMode={authMode} isTransitioning={isTransitioning} />

          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex items-center">
            <div className="w-full">
              <div className="lg:hidden flex items-center justify-center mb-8">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-2xl">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white ml-3">SkillLink</h1>
              </div>

              <AuthForm
                authMode={authMode}
                formData={formData}
                showPassword={showPassword}
                isTransitioning={isTransitioning}
                onInputChange={handleInputChange}
                onRoleChange={handleRoleChange}
                onInterestToggle={handleInterestToggle}
                onSubmit={handleSubmit}
                onTogglePassword={() => setShowPassword(!showPassword)}
                onSwitchMode={switchMode}
                apiMessage={apiMessage}
                isError={isError}
                isLoading={isLoading}
                passwordValidation={passwordValidation}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-20 left-20 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-32 right-32 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-20 w-1 h-1 bg-white rounded-full animate-ping animation-delay-1000"></div>
    </div>
  );
}
