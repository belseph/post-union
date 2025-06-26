import React, { useState } from 'react';
import { Settings, Shield, Users, Tag } from 'lucide-react';
import { UnifiedModal } from './UnifiedModal';
import type { UserRole, UserInterest } from '../types/auth';

interface UnifiedSelectorProps {
  selectedRole: UserRole | '';
  selectedInterests: UserInterest[];
  onRoleChange: (role: UserRole) => void;
  onInterestToggle: (interest: UserInterest) => void;
  authMode: 'login' | 'register' | 'forgot';
}

export const UnifiedSelector: React.FC<UnifiedSelectorProps> = ({
  selectedRole,
  selectedInterests,
  onRoleChange,
  onInterestToggle,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const roleLabels: Record<UserRole, { label: string; icon: typeof Shield }> = {
    'Mentor': { label: 'Mentor', icon: Shield },
    'Colaborador': { label: 'Colaborador', icon: Users }
  };

  const selectedRoleData = selectedRole ? roleLabels[selectedRole] : null;

  const getDisplayText = () => {
    if (!selectedRole && (!selectedInterests || selectedInterests.length === 0)) {
      return 'Configurar perfil';
    }
    
    const parts = [];
    if (selectedRole) {
      parts.push(selectedRoleData?.label);
    }
    if (selectedInterests && selectedInterests.length > 0) {
      parts.push(`${selectedInterests.length} intereses`);
    }
    
    return parts.join(' • ');
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="w-full p-3 cursor-pointer bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/15 hover:border-white/30 transition-all duration-300 flex items-center justify-between group no-translate-on-hover"
      >
        <div className="flex items-center space-x-3">
          {selectedRole || (selectedInterests && selectedInterests.length > 0) ? (
            <>
              <div className="p-1.5 rounded-lg bg-white/10 flex items-center space-x-1">
                {selectedRole && selectedRoleData && (
                  <selectedRoleData.icon className="w-4 h-4 text-cyan-400" />
                )}
                {selectedInterests && selectedInterests.length > 0 && <Tag className="w-4 h-4 text-emerald-400" />}
              </div>
              <span className="font-medium text-sm">{getDisplayText()}</span>
            </>
          ) : (
            <>
              <div className="p-1.5 rounded-lg bg-white/10">
                <Settings className="w-4 h-4 text-white/50" />
              </div>
              <span className="text-white/70 text-sm">Configurar perfil</span>
            </>
          )}
        </div>
        <Settings className="w-4 h-4 text-white/50 group-hover:text-white/70 group-hover:rotate-90 transition-all duration-300" />
      </button>

      <UnifiedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedRole={selectedRole}
        selectedInterests={selectedInterests || []}
        onRoleChange={onRoleChange}
        onInterestToggle={onInterestToggle}
      />
    </div>
  );
};