import type { ReactNode } from 'react';
import 'styles/Button.css';

type ButtonProps = {
  variant?: 'default' | 'outline';
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

export function Button({ variant = 'default', className = '', onClick, children }: ButtonProps) {
  return (
    <button className={`button button--${variant} ${className}`} onClick={onClick} type="button">
      {children}
    </button>
  );
}
