import React from 'react';
import { Check, X } from 'lucide-react';

interface PasswordValidationProps {
  passwordValidation: {
    isValid: boolean;
    checks: Array<{
      id: string;
      label: string;
      isValid: boolean;
    }>;
  };
  authMode: 'login' | 'register' | 'forgot';
}

export const PasswordValidation: React.FC<PasswordValidationProps> = ({
  passwordValidation,
  authMode
}) => {
  if (authMode !== 'register') return null;

  return (
    <div className="mt-1.5 flex items-center justify-between">
      {passwordValidation.checks.map((validation) => (
        <div
          key={validation.id}
          className={`flex items-center space-x-1.5 text-xs transition-all duration-300 ${
            validation.isValid 
              ? 'text-emerald-400' 
              : 'text-white/50'
          }`}
        >
          <div className={`w-3 h-3 rounded-full flex items-center justify-center transition-all duration-300 ${
            validation.isValid 
              ? 'bg-emerald-500/20 border border-emerald-400' 
              : 'bg-white/10 border border-white/20'
          }`}>
            {validation.isValid ? (
              <Check className="w-2 h-2 text-emerald-400" />
            ) : (
              <X className="w-2 h-2 text-white/30" />
            )}
          </div>
          <span className={`transition-all duration-300 whitespace-nowrap ${
            validation.isValid ? 'font-medium' : 'font-normal'
          }`}>
            {validation.label}
          </span>
        </div>
      ))}
    </div>
  );
};