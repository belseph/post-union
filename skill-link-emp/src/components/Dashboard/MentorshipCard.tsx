import React from 'react';
import { Calendar, Clock, MessageCircle, Video } from 'lucide-react';
import { Mentorship } from '../../types';

interface MentorshipCardProps {
  mentorship: Mentorship;
}

export const MentorshipCard: React.FC<MentorshipCardProps> = ({ mentorship }) => {
  const statusColors = {
    active: 'bg-emerald-100 text-emerald-700',
    completed: 'bg-blue-100 text-blue-700',
    paused: 'bg-orange-100 text-orange-700'
  };

  const statusLabels = {
    active: 'Activo',
    completed: 'Completado',
    paused: 'Pausado'
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={mentorship.mentee.avatar}
            alt={mentorship.mentee.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-white font-semibold">{mentorship.mentee.name}</h3>
            <p className="text-white/70 text-sm">{mentorship.mentee.project}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[mentorship.status]}`}>
          {statusLabels[mentorship.status]}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-white/70 mb-2">
          <span>Progreso</span>
          <span>{mentorship.progress}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${mentorship.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-white/70 mb-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>{mentorship.hoursCompleted}/{mentorship.totalHours}h</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>{new Date(mentorship.nextSession).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
          <Video className="w-4 h-4" />
          <span>Reunión</span>
        </button>
        <button className="flex-1 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
          <MessageCircle className="w-4 h-4" />
          <span>Mensaje</span>
        </button>
      </div>
    </div>
  );
};