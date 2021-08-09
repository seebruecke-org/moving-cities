import clsx from 'clsx';
import Link from 'next/link';

export default function ThreadListItem({ target, title, subtitle, active, ...props }) {
  return (
    <Link href={target}>
      <a
        className={clsx(
          'flex items-start px-6 py-4 hover:bg-yellow-300 border-b border-grey-300',
          active && 'bg-yellow-300'
        )}
        {...props}>
        <span>
          <h2 className="text-2xl font-bold font-raptor mt-1">{title}</h2>
          <p className="text-xl md:text-m font-raptor">{subtitle}</p>
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="14"
          viewBox="0 0 10 14"
          className={clsx('mt-3 ml-auto w-4 md:w-8 h-auto flex-grow-0', active && 'text-red-300')}>
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="3"
            d="M2.78 11.88L7.66 7M2.9 2l4.88 4.88"
          />
        </svg>
      </a>
    </Link>
  );
}
