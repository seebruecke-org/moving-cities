import clsx from 'clsx';

export default function ThreadListItem({
  target,
  title,
  subtitle,
  active,
  data,
  className,
  ...props
}) {
  return (
    <a
      href={target}
      className={clsx(
        'flex items-start pl-6 pr-4 py-4 hover:bg-yellow-300 border-b border-grey-300 w-full',
        active && 'bg-yellow-300',
        className
      )}
      {...props}
    >
      <span className="font-raptor leading-snug">
        <h2 className="text-m font-bold mt-1 ">{title}</h2>
        <p className="text-2xs md:text-xs">{subtitle}</p>
      </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="14"
        viewBox="0 0 10 14"
        className={clsx(
          'mt-3 ml-auto w-4 md:w-5 h-auto flex-grow-0 flex-shrink-0',
          active && 'text-red-300 hidden md:flex'
        )}
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="3"
          d="M2.78 11.88L7.66 7M2.9 2l4.88 4.88"
        />
      </svg>
    </a>
  );
}
