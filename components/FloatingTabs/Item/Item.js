import { forwardRef } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

function FloatingTabsItem({ target, label, active = false, className, ...props }, ref) {
  return (
    <>
      <Link href={target}>
        <a
          ref={ref}
          className={clsx(
            'px-6 pt-6 pb-5 text-xs font-raptor font-semibold h-full flex leading-none',
            active && 'bg-yellow-300 shadow-md',
            className
          )}
          {...props}>
          {label}
        </a>
      </Link>
    </>
  );
}

export default forwardRef(FloatingTabsItem);
