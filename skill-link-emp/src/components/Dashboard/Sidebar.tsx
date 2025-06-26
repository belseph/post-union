import React from 'react';
import { Calendar, Clock, Users, Award, BookOpen, Network } from 'lucide-react';
import { Session } from '../../types';

interface SidebarProps {
  role: 'mentor' | 'entrepreneur';
  sessions: Session[];
}

export const Sidebar: React.FC<SidebarProps> = ({ role, sessions }) => {
  const todaysDate = new Date().toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="space-y-6">
      {/* Calendar Widget */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="w-5 h-5 text-emerald-400" />
          <h3 className="text-white font-semibold">Agenda de Hoy</h3>
        </div>
        <p className="text-white/70 text-sm mb-4 capitalize">{todaysDate}</p>
        
        <div className="space-y-3">
          {sessions.map((session) => (
            <div key={session.id} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{session.title}</p>
                <p className="text-white/60 text-xs">{session.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Role-specific content */}
      {role === 'mentor' ? (
        <>
          {/* Mentorship Requests */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="w-5 h-5 text-purple-400" />
              <h3 className="text-white font-semibold">Solicitudes Pendientes</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-white text-sm font-medium">Pedro Martínez</p>
                  <p className="text-white/60 text-xs">AgriTech Startup</p>
                </div>
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
                  Aceptar
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-white text-sm font-medium">Laura Silva</p>
                  <p className="text-white/60 text-xs">HealthTech Platform</p>
                </div>
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
                  Aceptar
                </button>
              </div>
            </div>
          </div>

          {/* Expertise Areas */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-2 mb-4">
              <Award className="w-5 h-5 text-orange-400" />
              <h3 className="text-white font-semibold">Áreas de Expertise</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Fintech', 'AI/ML', 'Marketing', 'UX/UI', 'Product Strategy'].map((skill) => (
                <span key={skill} className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Team Requests */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="w-5 h-5 text-purple-400" />
              <h3 className="text-white font-semibold">Solicitudes de Equipo</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-white text-sm font-medium">Alex Developer</p>
                  <p className="text-white/60 text-xs">Full Stack Developer</p>
                </div>
                <button className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
                  Invitar
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-white text-sm font-medium">Sarah Designer</p>
                  <p className="text-white/60 text-xs">UX/UI Designer</p>
                </div>
                <button className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
                  Invitar
                </button>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <h3 className="text-white font-semibold">Recursos Recomendados</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <p className="text-white text-sm font-medium">Lean Startup Methodology</p>
                <p className="text-white/60 text-xs">Business Strategy</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <p className="text-white text-sm font-medium">MVP Development Guide</p>
                <p className="text-white/60 text-xs">Product Development</p>
              </div>
            </div>
          </div>

          {/* Networking */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-2 mb-4">
              <Network className="w-5 h-5 text-emerald-400" />
              <h3 className="text-white font-semibold">Networking</h3>
            </div>
            <div className="text-center">
              <p className="text-white/70 text-sm mb-3">Próximo evento de networking</p>
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full">
                Startup Mixer 2025
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};