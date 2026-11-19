'use client';

import React from 'react';

export interface ChipOption<T extends string = string> {
  value: T;
  label: string;
}

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  theme?: 'light' | 'dark';
  ariaLabel?: string;
}

export function Chip({
  label,
  selected = false,
  onClick,
  theme = 'light',
  ariaLabel,
}: ChipProps) {
  const isDark = theme === 'dark';

  const baseClasses =
    'inline-flex items-center justify-center min-h-[44px] px-4 rounded-[22px] text-sm transition-all cursor-pointer select-none';

  const themeClasses = isDark
    ? selected
      ? 'bg-coral text-ink border-[1.5px] border-coral font-bold shadow-xs'
      : 'bg-white/10 text-white border-[1.5px] border-white/20 hover:border-white/40 font-medium'
    : selected
      ? 'bg-jade text-white border-[1.5px] border-jade font-semibold shadow-xs'
      : 'bg-white text-ink border-[1.5px] border-border font-medium hover:border-jade';

  return (
    <button
      type="button"
      role="button"
      aria-pressed={selected}
      aria-label={ariaLabel || label}
      onClick={onClick}
      className={`${baseClasses} ${themeClasses}`}
    >
      {label}
    </button>
  );
}

interface ChipGroupProps<T extends string = string> {
  options: Array<ChipOption<T>>;
  value: T;
  onChange: (value: T) => void;
  theme?: 'light' | 'dark';
  className?: string;
}

export function ChipGroup<T extends string = string>({
  options,
  value,
  onChange,
  theme = 'light',
  className = '',
}: ChipGroupProps<T>) {
  return (
    <div className={`flex flex-wrap gap-2 items-center ${className}`} role="group">
      {options.map((option) => (
        <Chip
          key={option.value}
          label={option.label}
          selected={value === option.value}
          onClick={() => onChange(option.value)}
          theme={theme}
        />
      ))}
    </div>
  );
}
