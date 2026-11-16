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
    'inline-flex items-center justify-center min-h-[44px] px-4 rounded-[22px] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer select-none';

  const themeClasses = isDark
    ? selected
      ? 'bg-yellow text-ink border border-yellow font-bold shadow-xs'
      : 'bg-ink-2 text-on-dark-1 border border-muted-2 hover:border-on-dark-1'
    : selected
      ? 'bg-ink text-white border border-ink font-bold shadow-xs'
      : 'bg-white text-ink border border-border-2 hover:border-ink';

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
}

export function ChipGroup<T extends string = string>({
  options,
  value,
  onChange,
  theme = 'light',
}: ChipGroupProps<T>) {
  return (
    <div className="flex flex-wrap gap-2.5 items-center" role="group">
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
