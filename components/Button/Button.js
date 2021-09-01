import clsx from 'clsx';
import Link from 'next/link';

export default function Button({ href, children, className, priority = false, ...props }) {
  const commonProps = {
    ...props,
    className: clsx(
      'border hover:border-black focus:border-black active:bg-yellow-300 active:border-yellow-300 rounded-3xl px-6 pt-5 pb-3 flex font-raptor leading-none text-l shadow-md font-semibold',
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
