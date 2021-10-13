import { Children } from 'react';
import clsx from 'clsx';

export default function Columns({ children, className }) {
  const COLUMN_CLASSNAMES = ['col-span-3 col-start-1', 'col-span-5 col-start-4'];

  return (
    <div className={clsx('lg:grid lg:grid-cols-9 gap-12', className)}>
      {Children.map(children, (child, index) => (
        <div className={COLUMN_CLASSNAMES[index]}>{child}</div>
      ))}
    </div>
  );
}
