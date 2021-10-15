import clsx from 'clsx';

export default function Paragraph({ children, className, isSmall = true }) {
  return (
    <p
      className={clsx(
        'leading-snug font-raptor max-w-full',
        className,
        isSmall ? 'text-s md:text-m' : 'text-m md:text-l'
      )}
    >
      {children}
    </p>
  );
}
