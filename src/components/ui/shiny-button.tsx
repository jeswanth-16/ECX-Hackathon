import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import './shiny-button.css';

export interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({
  children,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={twMerge(clsx('shiny-button-wrapper group', className))}
      {...props}
    >
      {/* Ambient background glow */}
      <span className="shiny-button-glow bg-gradient-to-r from-cyan-500/40 via-blue-600/40 to-indigo-500/30" />

      {/* Rotating conic gradient border beam */}
      <span className="shiny-conic-element" aria-hidden="true" />

      {/* Inner pill content container */}
      <span className="shiny-button-inner px-7 sm:px-8 py-3.5 sm:py-4">
        {/* Subtle technical dot matrix pattern */}
        <span className="shiny-button-dots" aria-hidden="true" />

        {/* Specular glass highlight */}
        <span className="shiny-button-specular" aria-hidden="true" />

        {/* Traveling light reflection shimmer */}
        <span className="shiny-button-shimmer" aria-hidden="true" />

        {/* High-contrast content label */}
        <span className="relative z-10 flex items-center justify-center gap-2 text-white font-bold text-sm sm:text-base font-sans tracking-wide">
          {children}
        </span>
      </span>
    </button>
  );
};

export default ShinyButton;
