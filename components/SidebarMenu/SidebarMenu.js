import clsx from 'clsx';
import Link from 'next/link';

export default function SidebarMenu({ items }) {
  return (
    <nav className="md:sticky top-0 h-full w-72 flex-grow-0 flex-shrink-0">
      {items.map(({ target, label, active: topLevelActive, items }, index) => (
        <>
          <Link href={target}>
            <a
              className={clsx(
                'px-8 block whitespace-nowrap font-bold pb-8',
                topLevelActive && 'bg-yellow-300',
                index === 0 ? 'pt-16' : 'pt-8'
              )}>
              {label}
            </a>
          </Link>

          {items &&
            items.map(({ target, label, active }) => (
              <Link href={target}>
                <a
                  className={clsx(
                    'block pl-12 py-3',
                    active && 'underline',
                    topLevelActive && 'bg-yellow-300'
                  )}>
                  {label}
                </a>
              </Link>
            ))}
        </>
      ))}
    </nav>
  );
}
