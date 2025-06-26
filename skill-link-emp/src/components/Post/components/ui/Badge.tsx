import React from 'react';
import { getTagColor } from '../../constants/tagColors';

interface BadgeProps {
  children: React.ReactNode;
  variant?: string;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant,
  className = ''
}) => {
  const colorClasses = variant ? getTagColor(variant) : getTagColor('default');

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 ${colorClasses} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;