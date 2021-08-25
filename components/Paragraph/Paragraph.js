import clsx from 'clsx';

export default function Paragraph({ children, className, isSmall = false }) {
  return <p className={clsx('leading-tight font-raptor', className, isSmall ? 'text-2xl' : 'text-2xl md:text-3xl')}>{children}</p>;
}
