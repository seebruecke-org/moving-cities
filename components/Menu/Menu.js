import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';
import Link from 'next/link';

import Burger from './Burger';
import Overlay from './Overlay';

import shadowStyles from './shadow.module.css';
import clsx from 'clsx';

const OVERLAY_PRIMARY_ITEMS = [
  {
    target: '/',
    label: 'Moving Cities'
  },

  {
    target: '/approaches',
    label: 'Inspiring Approaches'
  }
];

const OVERLAY_SECONDARY_ITEMS = [
  {
    target: '/about',
    label: 'About'
  },

  {
    target: '/about/contact',
    label: 'Contact'
  },

  {
    target: '/about/imprint',
    label: 'Imprint'
  },

  {
    target: '/about/privacy',
    label: 'Date Privacy'
  }
];

function OverlayItemPrimary({ target, label, ...props }) {
  return (
    <Link href={target}>
      <a className="font-raptor font-bold text-3xl hover:text-black" {...props}>
        {label}
      </a>
    </Link>
  );
}

function OverlayItemSecondary({ target, label, ...props }) {
  return (
    <Link href={target}>
      <a className="font-raptor font-bold text-m hover:text-black" {...props}>
        {label}
      </a>
    </Link>
  );
}

export default function Menu() {
  const { t } = useTranslation();
  const { t: tSlugs } = useTranslation('slugs');
  const overlayRef = useRef();
  const [isOverlayOpen, setIsOverlayOpen] = useState(null);

  useEffect(() => {
    const currentRef = overlayRef?.current;

    if (isOverlayOpen === true) {
      disableBodyScroll(currentRef);
    } else if (isOverlayOpen === false) {
      enableBodyScroll(currentRef);
    }
  }, [isOverlayOpen]);

  return (
    <>
      <div className="absolute left-0 top-0 w-full md:w-20 md:h-screen z-50">
        <header className="bg-gradient-to-br from-red-300 to-pink-300 fixed left-0 bottom-0 md:bottom-auto md:top-0 w-full md:w-24 text-white px-8 md:px-6 pt-5 pb-4 md:h-full whitespace-nowrap flex md:block">
          <Burger
            onOpen={() => setIsOverlayOpen(true)}
            onClose={() => setIsOverlayOpen(false)}
            className="order-last md:order-auto ml-auto"
          />

          <span className="flex md:flex-row-reverse items-center space-x-4 md:-rotate-90 md:-translate-x-full relative md:absolute top-1 md:top-24 md:left-6 md:origin-top-right">
            <Link href="/">
              <a
                className="flex items-center hover:text-black"
                onClick={() => setIsOverlayOpen(false)}>
                <span
                  className={clsx(
                    'uppercase order-last md:order-2 font-raptor font-semibold text-xl xs:text-2xl md:text-3xl whitespace-nowrap leading-none tracking-wide',
                    shadowStyles['text-shadow']
                  )}>
                  {t('menu.name')}
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="826"
                  height="447"
                  viewBox="0 0 826 447"
                  className="h-14 w-auto md:order-1 mx-10 relative hidden sm:block -top-1">
                  <path
                    fill="currentColor"
                    d="M37 111c10-61 70-57 99-48 29 10 53 83 114 99S317 9 364 0c46-8 19 104 68 111 49 8 58-75 112-85s45 37 128 54c83 18 91-24 131-17 41 8 20 84-7 99-27 14-6 81 21 140s-26 55-83 37c-57-19-13 81-82 104-68 24-25-66-47-141s-54 8-115 29-89-56-114-88c-26-32-101 134-139 114s-14-43-54-68c-40-24-105 47-159 7-55-41 1-109 13-185z"
                  />
                </svg>
              </a>
            </Link>

            <div className="hidden md:inline-block space-x-7">
              <Link href={`/${tSlugs('about')}`}>
                <a
                  className={clsx(
                    'uppercase whitespace-nowrap font-raptor text-m hover:text-black font-medium',
                    shadowStyles['text-shadow']
                  )}>
                  {t('menu.about')}
                </a>
              </Link>

              <Link href={`/${tSlugs('approaches')}`}>
                <a
                  className={clsx(
                    'uppercase whitespace-nowrap font-raptor font-medium text-m hover:text-black',
                    shadowStyles['text-shadow']
                  )}>
                  {t('menu.approaches')}
                </a>
              </Link>
            </div>
          </span>
        </header>
      </div>

      {isOverlayOpen && (
        <Overlay ref={overlayRef}>
          <ul>
            {OVERLAY_PRIMARY_ITEMS.map((item) => (
              <li>
                <OverlayItemPrimary {...item} onClick={() => setIsOverlayOpen(false)} />
              </li>
            ))}
          </ul>

          <ul className="mt-auto pb-28 md:pb-0">
            {OVERLAY_SECONDARY_ITEMS.map((item) => (
              <li>
                <OverlayItemSecondary {...item} onClick={() => setIsOverlayOpen(false)} />
              </li>
            ))}
          </ul>
        </Overlay>
      )}
    </>
  );
}
