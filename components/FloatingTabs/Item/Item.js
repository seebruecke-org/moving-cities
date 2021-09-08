import { forwardRef } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

function FloatingTabsItem({ target, label, active = false, count, className, ...props }, ref) {
  return (
    <>
      <Link href={target}>
        <a
          ref={ref}
          className={clsx(
            'px-6 pt-4 pb-3 text-xs font-raptor font-semibold h-full flex flex-col leading-tight',
            active && 'bg-yellow-300 shadow-md',
            className
          )}
          {...props}>
          <span className="md:whitespace-nowrap">{label}</span>

          {count && <span>({count})</span>}
        </a>
      </Link>
    </>
  );
}

export default forwardRef(FloatingTabsItem);
