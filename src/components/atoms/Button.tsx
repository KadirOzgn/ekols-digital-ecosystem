import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export const Button = ({ variant = 'primary', children, className = '', ...props }: ButtonProps) => {
  const baseStyles = "px-6 py-3 font-medium transition-colors text-sm uppercase tracking-widest border";
  
  const variants = {
    primary: "bg-primary text-on-primary border-primary hover:bg-primary-dark hover:border-primary-dark",
    outline: "bg-transparent text-white border-zinc-700 hover:border-primary hover:text-primary",
    ghost: "bg-transparent text-zinc-400 border-transparent hover:text-primary"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
