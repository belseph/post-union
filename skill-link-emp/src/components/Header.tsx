import React from 'react';
import { Lightbulb, Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  user: UserType;
  currentRole: 'mentor' | 'entrepreneur';
  onRoleSwitch: (role: 'mentor' | 'entrepreneur') => void;
  notifications: number;
}

export const Header: React.FC<HeaderProps> = ({ user, currentRole, onRoleSwitch, notifications }) => {
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const [showRoleMenu, setShowRoleMenu] = React.useState(false);

  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">SkillLink</h1>
              <p className="text-xs text-white/70">Emprendedor</p>
            </div>
          </div>

          {/* Center - Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-200 text-white"
            >
              <span className="capitalize font-medium">{currentRole}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showRoleMenu && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-white/20 py-2">
                <button
                  onClick={() => {
                    onRoleSwitch('mentor');
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-white/50 transition-colors ${
                    currentRole === 'mentor' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
                  }`}
                >
                  <div className="font-medium">Mentor</div>
                  <div className="text-xs text-gray-500">Guía emprendedores</div>
                </button>
                <button
                  onClick={() => {
                    onRoleSwitch('entrepreneur');
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-white/50 transition-colors ${
                    currentRole === 'entrepreneur' ? 'bg-purple-50 text-purple-700' : 'text-gray-700'
                  }`}
                >
                  <div className="font-medium">Entrepreneur</div>
                  <div className="text-xs text-gray-500">Desarrolla tu startup</div>
                </button>
              </div>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 p-1 hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-lg object-cover"
                />
                <div className="text-left hidden sm:block">
                  <div className="text-sm font-medium text-white">{user.name}</div>
                  <div className="text-xs text-white/70">{user.email}</div>
                </div>
                <ChevronDown className="w-4 h-4 text-white/70" />
              </button>

              {showProfileMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white/90 backdrop-blur-md rounded-lg shadow-lg border border-white/20 py-2">
                  <button className="w-full text-left px-4 py-2 hover:bg-white/50 transition-colors flex items-center space-x-3 text-gray-700">
                    <User className="w-4 h-4" />
                    <span>Mi Perfil</span>
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-white/50 transition-colors flex items-center space-x-3 text-gray-700">
                    <Settings className="w-4 h-4" />
                    <span>Configuración</span>
                  </button>
                  <hr className="my-2 border-gray-200" />
                  <button className="w-full text-left px-4 py-2 hover:bg-white/50 transition-colors flex items-center space-x-3 text-red-600">
                    <LogOut className="w-4 h-4" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};