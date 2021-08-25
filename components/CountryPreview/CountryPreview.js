import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import styles from './styles.module.css';
import Heading from '../Heading';

export default function CountryPreview({ cities }) {
  const { t: tSlugs } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ul
      className={clsx('bg-yellow-300 h-full overflow-y-auto flex flex-col', styles.countryPreview)}>
      {cities.map(({ name, networks }) => (
        <li className={clsx('flex flex-wrap border-b border-grey-300', isOpen && 'bg-white')}>
          {networks?.length > 0 ? (
            <>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between font-raptor text-xl py-4 px-8 w-full group">
                <span className="group-hover:underline">{name}</span>

                {isOpen ? '-' : '+'}
              </button>

              {isOpen && (
                <div>
                  <Heading level={3} as={4} className="px-8 py-4">
                    City Networks
                  </Heading>

                  <ul className="bg-white w-full px-8 py-4">
                    {networks.map(({ name: networkName, slug }) => (
                      <li>
                        <Link href={`/${tSlugs('networks')}/${slug}`}>
                          <a className="font-raptor text-xl group">
                            <span className="group-hover:underline">{networkName}</span>

                            <span className="text-red-300 ml-4">⟶</span>
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
