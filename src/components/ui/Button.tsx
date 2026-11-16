import React from 'react';
import Link from 'next/link';

export type ButtonVariant =
  | 'primary-yellow'
  | 'primary-red'
  | 'primary-ink'
  | 'outline'
  | 'text-link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  fullWidth?: boolean;
  size?: 'md' | 'lg' | 'call';
}

export function Button({
  children,
  variant = 'primary-red',
  href,
  fullWidth = false,
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const heightStyles = {
    md: 'min-h-[44px] h-[48px] px-5 text-sm',
    lg: 'min-h-[52px] h-[52px] px-6 text-base',
    call: 'min-h-[56px] h-[56px] px-6 text-lg font-bold',
  }[size];

  const variantStyles = {
    'primary-yellow':
      'bg-yellow text-ink font-bold hover:bg-[#FFD966] active:scale-[0.99] border-none shadow-sm',
    'primary-red':
      'bg-red text-white font-bold hover:bg-[#A31F17] active:scale-[0.99] border-none shadow-sm',
    'primary-ink':
      'bg-ink text-white font-bold hover:bg-ink-2 active:scale-[0.99] border-none shadow-sm',
    outline:
      'bg-transparent text-ink border-2 border-border-2 hover:border-ink active:scale-[0.99]',
    'text-link':
      'bg-transparent text-red-text hover:text-[#7C1711] underline underline-offset-4 min-h-[44px] px-2 font-medium',
  }[variant];

  const combinedClasses = `inline-flex items-center justify-center rounded-[12px] transition-all cursor-pointer select-none ${
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
