import clsx from 'clsx';

export default function Heading({ level = 1, as, children, className, ...props }) {
  const Tag = `h${as || level}`;
  const styles = {
    h1: 'text-3xl md:text-6xl leading-tight font-bold font-raptor',
    h2: 'text-l md:text-5xl leading-tight font-bold font-raptor',
    h3: 'text-3xl leading-tight font-bold font-raptor',
    h4: 'text-2xl leading-tight font-bold font-raptor'
  };

  return (
    <Tag className={clsx(styles[Tag], className)} {...props}>
      {children}
    </Tag>
  );
}
