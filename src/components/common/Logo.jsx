import { clsx } from 'clsx';

const SIZES = {
  sm: 'h-5',
  md: 'h-7',
  lg: 'h-10',
  xl: 'h-14',
};

export default function Logo({ className, size = 'md', variant = 'black' }) {
  const src =
    variant === 'white' ? '/logo-wordmark-white.svg' : '/logo-wordmark-black.svg';

  return (
    <img
      src={src}
      alt="Garabato"
      className={clsx('w-auto select-none', SIZES[size], className)}
      draggable="false"
    />
  );
}
