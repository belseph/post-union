import React from 'react';
import { Users, Calendar, TrendingUp, MessageCircle } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const statusColors = {
    ideation: 'bg-purple-100 text-purple-700',
    development: 'bg-blue-100 text-blue-700',
    validation: 'bg-orange-100 text-orange-700',
    launch: 'bg-emerald-100 text-emerald-700'
  };

  const statusLabels = {
    ideation: 'Ideación',
    development: 'Desarrollo',
    validation: 'Validación',
    launch: 'Lanzamiento'
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-lg">{project.name}</h3>
          <p className="text-white/70 text-sm mt-1">{project.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
          {statusLabels[project.status]}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-white/70 mb-2">
          <span>Progreso del MVP</span>
          <span>{project.progress}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-white/70 text-sm">
            <Users className="w-4 h-4" />
            <span>{project.teamMembers}</span>
          </div>
          <p className="text-xs text-white/60">Equipo</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-white/70 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{project.daysUntilPitch}</span>
          </div>
          <p className="text-xs text-white/60">Días hasta pitch</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 text-emerald-300 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>MVP</span>
          </div>
          <p className="text-xs text-white/60">En desarrollo</p>
        </div>
      </div>

      {project.mentor && (
        <div className="flex items-center space-x-3 mb-4 p-3 bg-white/5 rounded-lg">
          <img
            src={project.mentor.avatar}
            alt={project.mentor.name}
            className="w-8 h-8 rounded-lg object-cover"
          />
          <div>
            <p className="text-white text-sm font-medium">{project.mentor.name}</p>
            <p className="text-white/60 text-xs">{project.mentor.specialty}</p>
          </div>
        </div>
      )}

      <div className="flex space-x-2">
        <button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Ver Detalles
        </button>
        <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <MessageCircle className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};