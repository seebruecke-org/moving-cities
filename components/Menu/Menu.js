import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Link from 'next/link';

import Burger from './Burger';
import Button from '@/components/Button';
import LanguageSwitch from './LanguageSwitch';
import Overlay from './Overlay';

import { useIsMounted } from '@/lib/hooks';

import shadowStyles from './shadow.module.css';

function OverlayItemPrimary({ target, label, ...props }) {
  return (
    <Link href={target}>
      <a
        className="font-raptor font-bold text-2xl md:text-4xl xl:text-5xl leading-none hover:underline"
        {...props}
      >
        {label}
      </a>
    </Link>
  );
}

function OverlayItemSecondary({ target, label, ...props }) {
  return (
    <Link href={target}>
      <a className="font-raptor font-bold text-m md:text-3xl hover:underline" {...props}>
        {label}
      </a>
    </Link>
  );
}

export default function Menu({ items = [], cta }) {
  const { t } = useTranslation();
  const { t: tSlugs } = useTranslation('slugs');
  const overlayRef = useRef();
  const isFirstRender = useIsMounted();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const { locales, locale } = useRouter();

  const OVERLAY_PRIMARY_ITEMS = [
    {
      target: '/',
      label: t('menu.name')
    },

    {
      target: `/${tSlugs('approaches')}`,
      label: t('menu.approaches')
    },

    {
      target: `/${tSlugs('about')}`,
      label: t('menu.about')
    }
  ];

  const OVERLAY_SECONDARY_ITEMS = items.map(({ about: { title, slug } }) => ({
    target: `/${tSlugs('about')}/${slug}`,
    label: title
  }));

  useEffect(() => {
    const currentRef = overlayRef?.current;

    if (isFirstRender) {
      return;
    }

    if (isOverlayOpen === true) {
      disableBodyScroll(currentRef);
    } else {
      clearAllBodyScrollLocks();
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

          <span className="flex md:flex-row-reverse items-center space-x-4 md:-rotate-90 md:-translate-x-full relative md:absolute top-1 md:top-24 md:left-5 md:origin-top-right">
            <Link href="/">
              <a
                className="flex items-center hover:underline leading-none"
                onClick={() => setIsOverlayOpen(false)}
              >
                <span
                  className={clsx(
                    'uppercase order-last md:order-2 font-raptor font-semibold text-xl xs:text-2xl md:text-3xl whitespace-nowrap tracking-wide',
                    shadowStyles['text-shadow']
                  )}
                >
                  {t('menu.name')}
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="826"
                  height="447"
                  viewBox="0 0 826 447"
                  className="h-14 w-auto md:order-1 mx-10 relative hidden sm:block"
                >
                  <path
                    fill="currentColor"
                    d="M37 111c10-61 70-57 99-48 29 10 53 83 114 99S317 9 364 0c46-8 19 104 68 111 49 8 58-75 112-85s45 37 128 54c83 18 91-24 131-17 41 8 20 84-7 99-27 14-6 81 21 140s-26 55-83 37c-57-19-13 81-82 104-68 24-25-66-47-141s-54 8-115 29-89-56-114-88c-26-32-101 134-139 114s-14-43-54-68c-40-24-105 47-159 7-55-41 1-109 13-185z"
                  />
                </svg>
              </a>
            </Link>
          </span>

          <LanguageSwitch current={locale} locales={locales} />
        </header>
      </div>

      <Overlay ref={overlayRef} isOpen={isOverlayOpen}>
        <ul className="space-y-10 md:space-y-12">
          {OVERLAY_PRIMARY_ITEMS.map((item) => (
            <li>
              <OverlayItemPrimary {...item} onClick={() => setIsOverlayOpen(false)} />
            </li>
          ))}
        </ul>

        <div className="flex flex-col md:flex-row md:justify-between mt-auto pb-28 md:pb-0">
          <ul>
            {OVERLAY_SECONDARY_ITEMS.map((item) => (
              <li>
                <OverlayItemSecondary {...item} onClick={() => setIsOverlayOpen(false)} />
              </li>
            ))}
          </ul>

          <ul className="md:hidden flex mt-8">
            {locales.map((currentLocale, index) => (
              <li>
                <Link href="/" locale={currentLocale}>
                  <a
                    className={clsx(
                      'font-raptor font-bold text-m md:text-3xl hover:underline mr-4 uppercase leading-none',
                      index !== 0 && 'border-l-2 pl-4',
                      locale === currentLocale && 'underline'
                    )}
                    onClick={() => setIsOverlayOpen(false)}
                  >
                    {currentLocale}
                  </a>
                </Link>
              </li>
            ))}
          </ul>

          {cta && (
            <div className="self-start md:self-end mt-10 md:mt-0">
              <Button
                href={`/${tSlugs('about')}/${cta.slug}`}
                className="text-black"
                onClick={() => setIsOverlayOpen(false)}
              >
                <span className="text-red-300 mr-4 text-2xl relative h-11">+</span>
                <span>{t('addCity')}</span>
              </Button>
            </div>
          )}
        </div>
      </Overlay>
    </>
  );
}
