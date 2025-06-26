import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: LucideIcon;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  loading = false,
  icon: Icon,
  className = '',
  type = 'button'
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer outline-none border-none';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700',
    ghost: 'hover:bg-slate-100 text-slate-600 hover:text-slate-800',
    danger: 'bg-red-600 hover:bg-red-700 text-white'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const iconOnlyClasses = Icon && !children ? {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3'
  } : {};

  const finalSizeClasses = Icon && !children ? iconOnlyClasses[size] : sizeClasses[size];
  const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${finalSizeClasses} ${disabledClasses} ${className}`}
      style={{ outline: 'none', border: 'none' }}
      onFocus={(e) => e.target.blur()}
    >
      {loading && (
        <span className={`animate-spin ${children ? 'mr-2' : ''}`}>⚙️</span>
      )}
      {Icon && !loading && (
        <Icon className={`w-4 h-4 ${children ? 'mr-2' : ''}`} />
      )}
      {children}
    </button>
  );
};

export default Button;