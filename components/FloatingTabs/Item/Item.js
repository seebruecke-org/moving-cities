import clsx from 'clsx';
import Link from 'next/link';

export default function FloatingTabsItem({ target, label, active = false }) {
  return (
    <Link href={target}>
      <a
        className={clsx(
          'px-4 py-4 text-s font-raptor font-medium h-full flex',
          active && 'bg-yellow-300 shadow-md'
        )}>
        {label}
      </a>
    </Link>
  );
}
