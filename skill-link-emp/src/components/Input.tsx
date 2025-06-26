import React, { forwardRef, InputHTMLAttributes, ReactNode, useState, useRef } from 'react';
import { FileText } from 'lucide-react';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: 'default' | 'filled' | 'outlined';
  inputSize?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  fileText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      variant = 'default',
      inputSize = 'md',
      fullWidth = false,
      className = '',
      disabled,
      type,
      fileText = 'Seleccionar archivo',
      ...props
    },
    ref
  ) => {
    const isFileInput = type === 'file';

    const baseClasses = [
      'relative',
      'transition-all',
      'duration-200',
      'ease-in-out',
      'rounded-lg',
      'border',
      'outline-none',
      'placeholder-white/60',
      'focus:ring-2',
      'focus:ring-purple-400',
      'focus:ring-opacity-50',
      'disabled:opacity-50',
      'disabled:cursor-not-allowed',
      fullWidth ? 'w-full' : '',
    ];

    const variantClasses = {
      default: [
        'bg-white/20',
        'border-white/30',
        'focus:border-blue-500',
        'hover:border-gray-400',
      ],
      filled: [
        'bg-gray-50',
        'border-gray-200',
        'focus:bg-white',
        'focus:border-blue-500',
        'hover:bg-gray-100',
      ],
      outlined: [
        'bg-transparent',
        'border-2',
        'border-gray-300',
        'focus:border-blue-500',
        'hover:border-gray-400',
      ],
    };

    const sizeClasses = {
      sm: ['px-3', 'py-2', 'text-sm'],
      md: ['px-4', 'py-3', 'text-base'],
      lg: ['px-5', 'py-4', 'text-lg'],
    };

    const errorClasses = error ? [
      'border-red-500',
      'focus:border-red-500',
      'focus:ring-red-500',
      'focus:ring-opacity-50',
    ] : [];

    const fileInputClasses = isFileInput ? [
      'hidden',
    ] : [];

    const inputClasses = [
      ...baseClasses,
      ...variantClasses[variant],
      ...sizeClasses[inputSize],
      ...errorClasses,
      ...fileInputClasses,
      className,
    ].join(' ');

    const containerClasses = [
      'flex',
      'flex-col',
      'gap-1',
      fullWidth ? 'w-full' : '',
    ].join(' ');

    const labelClasses = [
      'text-sm',
      'font-medium',
      error ? 'text-red-600' : 'text-white',
      'mb-1',
    ].join(' ');

    const helperTextClasses = [
      'text-xs',
      error ? 'text-red-500' : 'text-white/60',
    ].join(' ');

    const FileInput = () => {
      const [fileName, setFileName] = useState<string>('');
      const fileInputRef = useRef<HTMLInputElement>(null);

      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setFileName(file.name);
        }
        if (props.onChange) {
          props.onChange(e);
        }
      };

      const handleButtonClick = () => {
        fileInputRef.current?.click();
      };

      const fileButtonClasses = [
        'relative',
        'flex',
        'items-center',
        'justify-between',
        'w-full',
        'cursor-pointer',
        'transition-all',
        'duration-200',
        'ease-in-out',
        'rounded-lg',
        'border',
        'outline-none',
        'focus:ring-2',
        'focus:ring-purple-400',
        'focus:ring-opacity-50',
        'disabled:opacity-50',
        'disabled:cursor-not-allowed',
        ...variantClasses[variant],
        ...sizeClasses[inputSize],
        ...errorClasses,
        className,
      ].join(' ');

      return (
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            disabled={disabled}
            {...props}
          />
          
          <button
            type="button"
            className={fileButtonClasses}
            onClick={handleButtonClick}
            disabled={disabled}
          >
            <div className="flex items-center gap-3">
              {leftIcon && (
                <div className="text-white">
                  {leftIcon}
                </div>
              )}
              <span className={fileName ? 'text-white' : 'text-white/60'}>
                {fileName || fileText}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {rightIcon && (
                <div className="text-white">
                  {rightIcon}
                </div>
              )}
              <FileText className="w-5 h-5 text-white" />
            </div>
          </button>
        </div>
      );
    };

    if (isFileInput) {
      return (
        <div className={containerClasses}>
          {label && (
            <label className={labelClasses}>
              {label}
            </label>
          )}
          
          <FileInput />
          
          {(error || helperText) && (
            <p className={helperTextClasses}>
              {error || helperText}
            </p>
          )}
        </div>
      );
    }

    return (
      <div className={containerClasses}>
        {label && (
          <label className={labelClasses}>
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            className={inputClasses}
            style={{
              paddingLeft: leftIcon ? '2.75rem' : undefined,
              paddingRight: rightIcon ? '2.75rem' : undefined,
            }}
            disabled={disabled}
            type={type}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
              {rightIcon}
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <p className={helperTextClasses}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';