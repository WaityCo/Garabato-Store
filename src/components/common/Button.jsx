import { clsx } from 'clsx';
import { forwardRef } from 'react';

const Button = forwardRef(function Button(
  {
    as: As = 'button',
    variant = 'primary',
    size = 'md',
    full = false,
    className,
    children,
    ...props
  },
  ref
) {
  const base =
    'inline-flex items-center justify-center gap-2 font-display tracking-[0.16em] uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed select-none';
  const sizes = {
    sm: 'px-4 py-2.5 text-xs',
    md: 'px-6 py-3.5 text-sm',
    lg: 'px-8 py-4 text-sm',
    xl: 'px-10 py-5 text-base',
  };
  const variants = {
    primary:   'bg-accent text-black hover:bg-text',
    secondary: 'bg-text text-black hover:bg-accent',
    outline:   'border border-line text-text hover:bg-white/5 hover:border-text',
    ghost:     'text-text hover:bg-white/5',
    dark:      'bg-bg text-text border border-line hover:border-text',
  };
  return (
    <As
      ref={ref}
      className={clsx(base, sizes[size], variants[variant], full && 'w-full', className)}
      {...props}
    >
      {children}
    </As>
  );
});

export default Button;
