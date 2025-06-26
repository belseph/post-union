import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface AuthInputProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: typeof LucideIcon;
  required?: boolean;
  className?: string;
  authMode: 'login' | 'register' | 'forgot';
  rightElement?: React.ReactNode;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  icon: Icon,
  required = false,
  className = '',
  authMode,
  rightElement
}) => {
  const focusColorClass = authMode === 'register' 
    ? 'focus:border-cyan-400 focus:ring-cyan-400/20 group-focus-within:text-cyan-400' 
    : 'focus:border-purple-400 focus:ring-purple-400/20 group-focus-within:text-purple-400';

  return (
    <div className={`relative group ${className}`}>
      <Icon className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5 transition-colors duration-300 ${focusColorClass.split(' ')[2]}`} />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full pl-11 ${rightElement ? 'pr-12' : 'pr-4'} py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:outline-none transition-all duration-300 backdrop-blur-sm hover:bg-white/15 ${focusColorClass.split(' ').slice(0, 2).join(' ')}`}
        required={required}
      />
      {rightElement && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {rightElement}
        </div>
      )}
    </div>
  );
};