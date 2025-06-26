import React, { useState } from 'react';
import { Users, Clock, TrendingUp, DollarSign, Search, Filter } from 'lucide-react';
import { StatsCard } from './Dashboard/StatsCard';
import { MentorshipCard } from './Dashboard/MentorshipCard';
import { Sidebar } from './Dashboard/Sidebar';
import { mockMentorships, mockSessions } from '../data/mockData';

export const MentorDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'paused'>('all');

  const filteredMentorships = mockMentorships.filter(mentorship => {
    const matchesSearch = mentorship.mentee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentorship.mentee.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || mentorship.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-600 to-purple-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Mentorías Activas"
            value={3}
            change="+2 este mes"
            icon={Users}
            color="emerald"
          />
          <StatsCard
            title="Horas de Mentoría"
            value={52}
            change="+12h esta semana"
            icon={Clock}
            color="blue"
          />
          <StatsCard
            title="Tasa de Éxito"
            value="89%"
            change="+5% vs mes anterior"
            icon={TrendingUp}
            color="purple"
          />
          <StatsCard
            title="Ingresos Mensuales"
            value="$2,400"
            change="+18% crecimiento"
            icon={DollarSign}
            color="orange"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                <h2 className="text-2xl font-bold text-white">Mentorías Activas</h2>
                
                <div className="flex space-x-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="w-5 h-5 text-white/60 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Buscar mentee o proyecto..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-white/20 border border-white/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:border-emerald-400 w-full sm:w-64"
                    />
                  </div>
                  
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="all" className="bg-gray-800 text-white">Todos</option>
                    <option value="active" className="bg-gray-800 text-white">Activos</option>
                    <option value="completed" className="bg-gray-800 text-white">Completados</option>
                    <option value="paused" className="bg-gray-800 text-white">Pausados</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredMentorships.map((mentorship) => (
                  <MentorshipCard key={mentorship.id} mentorship={mentorship} />
                ))}
              </div>

              {filteredMentorships.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-white/40 mx-auto mb-4" />
                  <p className="text-white/60">No se encontraron mentorías con los filtros aplicados</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar role="mentor" sessions={mockSessions} />
          </div>
        </div>
      </div>
    </div>
  );
};