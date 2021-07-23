import clsx from 'clsx';
import Link from 'next/link';

export default function Button({ href, children, className, ...props }) {
  const commonProps = {
    ...props,
    className: clsx(
      'bg-white border border-white hover:border-black focus:border-black active:bg-yellow-300 active:border-yellow-300 rounded-3xl px-6 py-3 flex text-raptor text-xl shadow-md',
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
