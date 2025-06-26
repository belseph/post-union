import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`relative ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-slate-100 flex-shrink-0`}
      />
    </div>
  );
};

export default Avatar;