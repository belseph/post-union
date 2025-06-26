import React, { useState } from 'react';
import { Lightbulb, Users, Target, Calendar, Search, Plus } from 'lucide-react';
import { StatsCard } from './Dashboard/StatsCard';
import { ProjectCard } from './Dashboard/ProjectCard';
import { Sidebar } from './Dashboard/Sidebar';
import { mockProjects, mockSessions } from '../data/mockData';

export const EntrepreneurDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = mockProjects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-600 to-purple-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Proyecto Actual"
            value="En Desarrollo"
            change="MVP al 65%"
            icon={Lightbulb}
            color="purple"
          />
          <StatsCard
            title="Miembros del Equipo"
            value={4}
            change="+1 esta semana"
            icon={Users}
            color="emerald"
          />
          <StatsCard
            title="Validación MVP"
            value="80%"
            change="Lista para launch"
            icon={Target}
            color="blue"
          />
          <StatsCard
            title="Días hasta Pitch"
            value={30}
            change="Fecha confirmada"
            icon={Calendar}
            color="orange"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                <h2 className="text-2xl font-bold text-white">Mis Proyectos</h2>
                
                <div className="flex space-x-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="w-5 h-5 text-white/60 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Buscar proyectos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-white/20 border border-white/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:border-purple-400 w-full sm:w-64"
                    />
                  </div>
                  
                  <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Nuevo Proyecto</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                  <Lightbulb className="w-12 h-12 text-white/40 mx-auto mb-4" />
                  <p className="text-white/60">No se encontraron proyectos</p>
                  <button className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                    Crear tu primer proyecto
                  </button>
                </div>
              )}
            </div>

            {/* Team Formation Section */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Formación de Equipo</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Roles Necesarios</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm">Frontend Developer</span>
                      <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">Buscando</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm">Marketing Specialist</span>
                      <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">Buscando</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Equipo Actual</h4>
                  <div className="flex -space-x-2">
                    <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop" alt="Team member" className="w-8 h-8 rounded-full border-2 border-white" />
                    <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop" alt="Team member" className="w-8 h-8 rounded-full border-2 border-white" />
                    <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&fit=crop" alt="Team member" className="w-8 h-8 rounded-full border-2 border-white" />
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-purple-500 flex items-center justify-center">
                      <Plus className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar role="entrepreneur" sessions={mockSessions} />
          </div>
        </div>
      </div>
    </div>
  );
};