import clsx from 'clsx';
import Link from 'next/link';

export default function Pill({ target, active, children }) {
  return (
    <Link href={target}>
      <a
        className={clsx(
          'border rounded-3xl border-black hover:border-red-300 block py-3 px-6 font-raptor font-semibold text-xs shadow-md',
          active && 'bg-yellow-300'
        )}>
        {children}
      </a>
    </Link>
  );
}
