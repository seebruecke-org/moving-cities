import clsx from 'clsx';

export default function Paragraph({ children, className }) {
  return <p className={clsx('text-2xl leading-tight font-raptor', className)}>{children}</p>;
}
