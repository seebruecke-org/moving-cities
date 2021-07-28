import clsx from 'clsx';
import Link from 'next/link';

export default function FloatingTabsItem({ target, label, active = false }) {
  return (
    <Link href={target}>
      <a
        className={clsx(
          'px-6 pt-6 pb-5 text-l font-raptor font-semibold h-full flex leading-none',
          active && 'bg-yellow-300 shadow-md'
        )}>
        {label}
      </a>
    </Link>
  );
}
