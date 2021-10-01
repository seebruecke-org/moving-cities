import clsx from 'clsx';

export default function Heading({ level = 1, as, children, className, ...props }) {
  const Tag = `h${as || level}`;
  const styles = {
    h1: 'text-4xl md:text-5xl leading-tight font-bold font-raptor',
    h2: 'text-2xl lg:text-3xl leading-tight font-bold font-raptor',
    h3: 'text-xl md:text-2xl leading-tight font-bold font-raptor',
    h4: 'text-l leading-tight font-bold font-raptor',
    h5: 'text-xl md:text-m leading-tight font-semibold md:font-bold font-raptor'
  };

  return (
    <Tag className={clsx(styles[Tag], className)} {...props}>
      {children}
    </Tag>
  );
}
