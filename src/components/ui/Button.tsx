import React from 'react';
import Link from 'next/link';

export type ButtonVariant =
  | 'primary-coral'
  | 'primary-jade'
  | 'primary-white'
  | 'mint'
  | 'outline'
  | 'text-link'
  // Legacy aliases for backward compatibility
  | 'primary-yellow'
  | 'primary-red'
  | 'primary-ink';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  fullWidth?: boolean;
  size?: 'md' | 'lg' | 'call';
}

export function Button({
  children,
  variant = 'primary-coral',
  href,
  fullWidth = false,
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const heightStyles = {
    md: 'min-h-[44px] h-[48px] px-5 text-sm rounded-[14px]',
    lg: 'min-h-[52px] h-[52px] px-6 text-base rounded-[16px]',
    call: 'min-h-[56px] h-[56px] px-6 text-lg font-bold rounded-[16px]',
  }[size];

  const variantStyles = {
    'primary-coral':
      'bg-coral text-ink font-bold hover:bg-[#ff6942] active:scale-[0.99] border-none shadow-sm',
    'primary-jade':
      'bg-jade text-white font-bold hover:bg-jade-dark active:scale-[0.99] border-none shadow-sm',
    'primary-white':
      'bg-white text-jade font-bold hover:bg-surface active:scale-[0.99] border-none shadow-sm',
    mint:
      'bg-mint text-jade font-bold hover:bg-[#d5e7df] active:scale-[0.99] border-none',
    outline:
      'bg-white text-ink border-[1.5px] border-border hover:border-jade active:scale-[0.99]',
    'text-link':
      'bg-transparent text-jade hover:text-jade-dark underline underline-offset-4 min-h-[44px] px-2 font-semibold',
    // Aliases
    'primary-yellow':
      'bg-coral text-ink font-bold hover:bg-[#ff6942] active:scale-[0.99] border-none shadow-sm',
    'primary-red':
      'bg-coral text-ink font-bold hover:bg-[#ff6942] active:scale-[0.99] border-none shadow-sm',
    'primary-ink':
      'bg-jade text-white font-bold hover:bg-jade-dark active:scale-[0.99] border-none shadow-sm',
  }[variant];

  const combinedClasses = `inline-flex items-center justify-center transition-all cursor-pointer select-none font-semibold ${
    fullWidth ? 'w-full' : ''
  } ${heightStyles} ${variantStyles} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses} aria-label={props['aria-label']}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
