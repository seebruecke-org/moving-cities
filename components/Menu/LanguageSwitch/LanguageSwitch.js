import { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import classNames from 'classnames';

export default function LanguageSwitch({ current, locales = [], localizations }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center relative">
      <button
        type="button"
        className="font-raptor font-bold text-l uppercase flex items-center leading-none hover:text-black"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{current}</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="14"
          viewBox="0 0 10 14"
          className={classNames(
            'ml-2 w-4 flex-shrink-0 h-auto',
            isOpen ? '-rotate-90' : 'rotate-90'
          )}
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="3"
            d="M2.78 11.88L7.66 7M2.9 2l4.88 4.88"
          />
        </svg>
      </button>

      <ul
        className={clsx(
          'absolute top-full right-1/2 translate-x-1/2 bg-yellow-300',
          !isOpen && 'hidden'
        )}
      >
        {locales
          .filter((currentLocale) => currentLocale !== current)
          .map((locale) => (
            <li>
              <Link
                href={localizations && localizations[locale] ? localizations[locale] : ''}
                locale={locale}
              >
                <a className="block font-raptor font-bold text-m text-black text-center uppercase py-4 px-6 hover:bg-black hover:text-white leading-none">
                  {locale}
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
