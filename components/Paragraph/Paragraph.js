import clsx from 'clsx';

export default function Paragraph({ children, className }) {
  return <p className={clsx('text-l leading-tight font-raptor', className)}>{children}</p>;
}
