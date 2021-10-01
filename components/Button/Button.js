import clsx from 'clsx';
import Link from 'next/link';

export default function Button({ href, children, className, priority = false, ...props }) {
  const commonProps = {
    ...props,
    className: clsx(
      'border-2 hover:border-black focus:border-black active:bg-black active:border-black active:text-white rounded-full px-5 md:px-7 py-4 flex font-raptor leading-none text-m md:text-l shadow-md font-semibold flex items-center',
      priority ? 'bg-yellow-300 border-yellow-300' : 'bg-white border-white',
      className
    )
  };

  const linkProps = {
    ...commonProps
  };

  const buttonProps = {
    ...commonProps,
    type: 'button'
  };

  if (href) {
    return (
      <Link href={href}>
        <a {...linkProps}>{children}</a>
      </Link>
    );
  }

  return <button {...buttonProps}>{children}</button>;
}
