import React from 'react';
import { Lightbulb, Users, Target, Sparkles } from 'lucide-react';
import type { AuthMode } from '../types/auth';

interface AuthBackgroundProps {
  authMode: AuthMode;
  isTransitioning: boolean;
}

export const AuthBackground: React.FC<AuthBackgroundProps> = ({ authMode, isTransitioning }) => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <div className={`absolute inset-0 smooth-background ${
        authMode === 'register' 
          ? 'bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700' 
          : 'bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700'
      }`}></div>
      
      <div className={`absolute inset-0 smooth-transition ${
        authMode === 'register' 
          ? 'opacity-100 transform scale-100' 
          : 'opacity-0 transform scale-95'
      }`}>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-emerald-500/20 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-blue-500/20 rounded-full transform translate-x-1/3 translate-y-1/3 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-12 flex flex-col justify-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className={`flex items-center mb-8 ${
            isTransitioning ? 'animate-fadeOutDown' : 'animate-fadeInUp'
          }`}>
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white ml-4">SkillLink</h1>
          </div>
          
          <h2 className={`text-4xl font-bold text-white mb-6 leading-tight ${
            isTransitioning ? 'animate-slideOutDown' : 'animate-slideInUp'
          }`}>
            {authMode === 'register' ? (
              <>
                Únete a la revolución
                <span className="block bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                  emprendedora
                </span>
              </>
            ) : (
              <>
                Transforma tus ideas en 
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  emprendimientos exitosos
                </span>
              </>
            )}
          </h2>
          
          <p className={`text-white/80 text-lg mb-8 leading-relaxed ${
            isTransitioning ? 'animate-fadeOutDown' : 'animate-fadeInUp'
          }`}>
            {authMode === 'register' 
              ? 'Forma parte de una comunidad de innovadores que están cambiando el mundo con sus ideas.'
              : 'Conecta con mentores, forma equipos y valida tu MVP en nuestra incubadora de ideas innovadoras.'
            }
          </p>
          
          <div className={`space-y-4 ${
            isTransitioning ? 'animate-fadeOutDown' : 'animate-fadeInUp'
          }`}>
            <div className="flex items-center text-white/90">
              <Users className={`w-5 h-5 mr-3 smooth-transition ${
                authMode === 'register' ? 'text-cyan-300' : 'text-yellow-300'
              }`} />
              <span>{authMode === 'register' ? 'Conecta con emprendedores afines' : 'Forma equipos por idea de negocio'}</span>
            </div>
            <div className="flex items-center text-white/90">
              <Target className={`w-5 h-5 mr-3 smooth-transition ${
                authMode === 'register' ? 'text-cyan-300' : 'text-yellow-300'
              }`} />
              <span>{authMode === 'register' ? 'Acceso a mentores expertos' : 'Mentorías especializadas'}</span>
            </div>
            <div className="flex items-center text-white/90">
              <Sparkles className={`w-5 h-5 mr-3 smooth-transition ${
                authMode === 'register' ? 'text-cyan-300' : 'text-yellow-300'
              }`} />
              <span>{authMode === 'register' ? 'Valida tu MVP con la comunidad' : 'Feedback de inversores simulados'}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`absolute top-10 right-10 w-20 h-20 border border-white/20 rounded-full smooth-transition ${
        authMode === 'register' 
          ? 'animate-spin-slow border-cyan-300/40 scale-125' 
          : 'animate-spin-slow border-white/20 scale-100'
      }`}></div>
      <div className={`absolute bottom-10 right-20 w-12 h-12 rounded-full smooth-transition ${
        authMode === 'register' 
          ? 'bg-cyan-400/20 animate-bounce scale-110' 
          : 'bg-white/10 animate-bounce scale-100'
      }`}></div>
    </div>
  );
};