import clsx from 'clsx';

export default function Paragraph({ children, className, isSmall = true }) {
  return (
    <p className={clsx('leading-tight font-raptor', className, isSmall ? 'text-l' : 'text-l')}>
      {children}
    </p>
  );
}
