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
      <a className="font-raptor font-bold text-5xl hover:text-black">{label}</a>
    </Link>
  );
}

function OverlayItemSecondary({ target, label }) {
  return (
    <Link href={target}>
      <a className="font-raptor font-bold text-3xl hover:text-black">{label}</a>
    </Link>
  );
}

export default function Menu() {
  const { t } = useTranslation();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <>
      <div className="absolute left-0 top-0 w-full md:w-20 md:h-screen z-50">
        <header className="bg-gradient-to-r from-pink-300 to-red-300 fixed left-0 bottom-0 md:bottom-auto md:top-0 w-full md:w-20 text-white p-4 md:h-full whitespace-nowrap flex md:block">
          <Burger
            onOpen={() => setIsOverlayOpen(true)}
            onClose={() => setIsOverlayOpen(false)}
            className="order-last md:order-auto ml-auto"
          />

          <span className="flex md:flex-row-reverse items-center space-x-4 md:-rotate-90 md:-translate-x-full md:absolute md:top-24 md:left-5 md:origin-top-right">
            <Link href="/">
              <a className="flex items-center hover:text-black">
                <span className="uppercase order-last md:order-2 font-raptor font-semibold text-4xl whitespace-nowrap leading-none">
                  Moving Cities
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="826"
                  height="447"
                  viewBox="0 0 826 447"
                  className="h-12 w-auto md:order-1 mx-7 relative hidden md:block">
                  <path
                    fill="currentColor"
                    d="M37 111c10-61 70-57 99-48 29 10 53 83 114 99S317 9 364 0c46-8 19 104 68 111 49 8 58-75 112-85s45 37 128 54c83 18 91-24 131-17 41 8 20 84-7 99-27 14-6 81 21 140s-26 55-83 37c-57-19-13 81-82 104-68 24-25-66-47-141s-54 8-115 29-89-56-114-88c-26-32-101 134-139 114s-14-43-54-68c-40-24-105 47-159 7-55-41 1-109 13-185z"
                  />
                </svg>
              </a>
            </Link>

            <div className="hidden md:inline-block space-x-6">
              <Link href="/about">
                <a className="uppercase whitespace-nowrap font-raptor text-xl hover:text-black">
                  About
                </a>
              </Link>

              <Link href="/approaches">
                <a className="uppercase whitespace-nowrap font-raptor text-xl hover:text-black">
                  Inspiring Approaches
                </a>
              </Link>
            </div>
          </span>
        </header>
      </div>

      {isOverlayOpen && (
        <Overlay>
          <ul>
            {OVERLAY_PRIMARY_ITEMS.map((item) => (
              <li>
                <OverlayItemPrimary {...item} />
              </li>
            ))}
          </ul>

          <ul className="mt-auto">
            {OVERLAY_SECONDARY_ITEMS.map((item) => (
              <li>
                <OverlayItemSecondary {...item} />
              </li>
            ))}
          </ul>
        </Overlay>
      )}
    </>
  );
}
