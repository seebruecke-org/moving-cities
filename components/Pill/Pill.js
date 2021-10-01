import clsx from 'clsx';
import Link from 'next/link';

export default function Pill({ target, active, children }) {
  return (
    <Link href={target}>
      <a
        className={clsx(
          'border rounded-full border-black hover:border-red-300 block py-5 px-6 font-raptor font-semibold text-xs shadow-md leading-none',
          active && 'bg-yellow-300'
        )}
      >
        {children}
      </a>
    </Link>
  );
}
