import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import Heading from '@/components/Heading';
import Richtext from '@/components/Blocks/Richtext';

import styles from './styles.module.css';

function CityItem({ name, networks, reasoning }) {
  const { t: tSlugs } = useTranslation();
  const { t } = useTranslation('city');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={clsx('w-full', isOpen && 'bg-white')}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between font-raptor text-s md:text-m py-3 px-8 w-full group text-left"
      >
        <span className="group-hover:underline">{name}</span>

        {isOpen ? '-' : '+'}
      </button>

      {isOpen && (
        <div>
          {networks?.length > 0 && (
            <>
              <Heading level={3} as={5} className="px-8 py-4">
                {t('networks')}
              </Heading>

              <ul className="bg-white w-full px-8">
                {networks.map(({ name: networkName, slug }) => (
                  <li>
                    <Link href={`/${tSlugs('networks')}/${slug}`}>
                      <a className="font-raptor text-xs md:text-s group">
                        <span className="group-hover:underline">{networkName}</span>

                        <span className="text-red-300 ml-4">⟶</span>
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          {reasoning && (
            <div className="px-8 py-4 space-y-6">
              <Heading level={3} as={5}>
                Why is this city on the map?
              </Heading>

              <Richtext richtext={reasoning} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function CitiesNetworksList({ cities, className }) {
  return (
    <ul
      className={clsx(
        'bg-yellow-300 h-full overflow-y-auto flex flex-col w-full',
        styles.countryPreview,
        className
      )}
    >
      {cities
        .map((city) => (
          <li className="flex flex-wrap border-b border-grey-300">
            <CityItem {...city} />
          </li>
        ))}
    </ul>
  );
}
