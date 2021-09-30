import { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

export default function LanguageSwitch({ current, locales = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  return <div className="absolute bottom-0 left-0 w-full p-8 md:p-6">
    <button type="button" className="font-raptor uppercase text-m hover:underline w-full flex items-center leading-none" onClick={() => setIsOpen(!isOpen)}>
      <span>{current}</span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="14"
        viewBox="0 0 10 14"
        className="ml-2 w-4 flex-shrink-0 h-auto"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="3"
          d="M2.78 11.88L7.66 7M2.9 2l4.88 4.88"
        />
      </svg>
    </button>

    <ul className={clsx('absolute bottom-0 left-full w-full bg-yellow-300 pb-3', !isOpen && 'hidden')}>
      {locales.map(locale => <li>
        <Link href="/" locale={locale}>
          <a className="block font-raptor font-bold text-m text-black text-center uppercase py-4 px-6 hover:bg-black hover:text-white leading-none">
            {locale}
          </a>
        </Link>
      </li>)}
    </ul>
  </div>;
}
