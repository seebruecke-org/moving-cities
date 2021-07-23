import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

import Burger from './Burger';
import Overlay from './Overlay';

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

function OverlayItemPrimary({ target, label }) {
  return (
    <Link href={target}>
      <a className="font-bold">{label}</a>
    </Link>
  );
}

function OverlayItemSecondary({ target, label }) {
  return (
    <Link href={target}>
      <a>{label}</a>
    </Link>
  );
}

export default function Menu() {
  const { t } = useTranslation();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <div className="absolute left-0 top-0 w-full md:w-12 md:h-screen z-30">
      <header className="bg-gradient-to-r from-pink-300 to-red-300 fixed left-0 bottom-0 md:bottom-auto md:top-0 w-full md:w-12 flex md:flex-col text-white p-4 md:h-full">
        <Burger
          onOpen={() => setIsOverlayOpen(true)}
          onClose={() => setIsOverlayOpen(false)}
          className="order-last md:order-auto ml-auto"
        />

        <Link href="/">
          <a className="flex md:flex-col items-center ">
            <span className="md:rotate-90 uppercase order-last md:order-auto">
              {t('menu.name')}
            </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="82"
              viewBox="0 0 44 82"
              className="rotate-90 md:rotate-0 hidden md:block">
              <path
                fill="currentColor"
                d="M11 78.3c-6-1-5.7-7-4.8-9.8 0-2.8 8.1-5.3 9.7-11.3C17.5 51 1 50.5 0 45.9c-.8-4.6 10.2-2 11-6.8.7-4.8-7.4-5.8-8.4-11.1s3.6-4.5 5.3-12.7c1.7-8.2-2.4-9-1.7-13s8.3-2 9.7.7c1.5 2.6 8 .6 13.8-2.1 5.8-2.7 5.5 2.5 3.6 8.2-1.8 5.7 8 1.4 10.3 8.1C46 24 37.1 19.8 29.7 22c-7.4 2.1.9 5.3 3 11.3 2 6-5.7 8.9-8.8 11.4-3.2 2.5 13.2 10 11.3 13.8-2 3.7-4.3 1.3-6.7 5.3-2.4 4 4.6 10.4.6 15.9-4 5.4-10.7-.2-18.2-1.4z"
              />
            </svg>
          </a>
        </Link>

        <div className="hidden md:flex md:flex-col">
          <Link href="/approaches">
            <a className="md:rotate-90 uppercase whitespace-nowrap">Inspiring Approaches</a>
          </Link>

          <Link href="/about">
            <a className="md:rotate-90 uppercase whitespace-nowrap">About</a>
          </Link>
        </div>
      </header>

      {isOverlayOpen && (
        <Overlay>
          <ul>
            {OVERLAY_PRIMARY_ITEMS.map((item) => (
              <li>
                <OverlayItemPrimary {...item} />
              </li>
            ))}
            {OVERLAY_SECONDARY_ITEMS.map((item) => (
              <li>
                <OverlayItemSecondary {...item} />
              </li>
            ))}
          </ul>
        </Overlay>
      )}
    </div>
  );
}
