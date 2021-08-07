import { Children } from 'react';
import clsx from 'clsx';

export default function Columns({ children, className }) {
  const COLUMN_CLASSNAMES = ['col-span-5 col-start-1', 'col-span-7 col-start-6'];

  return (
    <div className={clsx('md:grid md:grid-cols-12 gap-10', className)}>
      {Children.map(children, (child, index) => (
        <div className={COLUMN_CLASSNAMES[index]}>{child}</div>
      ))}
    </div>
  );
}
