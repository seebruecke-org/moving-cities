import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/Button';
import Markdown from '@/components/Markdown';
import Paragraph from '@/components/Paragraph';

import introImage from '@/public/images/intro.png';

import styles from './styles.module.css';

function CityShape({ image }) {
  const duration = 2500;
  const [active, setActive] = useState(false);
  const { x } = useSpring({ config: { duration }, x: active ? 1 : 0 });

  useEffect(() => {
    const id = setTimeout(() => {
      setActive(!active);
    }, duration);

    return () => clearTimeout(id);
  }, [active]);

  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <div>
      <Image src={image} priority placeholder="blur" />
    </div>
  );
}

function Count({ count, className, onClick = () => {}, ...props }) {
  return (
    <Link {...props}>
      <a
        className={clsx(
          'font-raptor text-4xl md:text-5-xl font-bold underline block hover:text-black',
          className
        )}
        onClick={onClick}
      >
        {count}
      </a>
    </Link>
  );
}

export default function Intro({
  onClose = () => {},
  title,
  intro,
  approachesCount,
  networksCount,
  featuredCitiesCount,
  citiesCount
}) {
  const { t } = useTranslation('intro');
  const { t: tSlugs } = useTranslation('slugs');

  return (
    <div className="relative w-full h-screen overflow-x-hidden pb-28 md:pb-0">
      <div className="relative md:absolute md:top-2 md:left-8 z-10 md:max-w-5xl px-8 pt-12">
        <h1
          className={clsx(
            'font-raptor text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold leading-none mb-12 bg-clip-text bg-gradient-to-b from-red-300 to-pink-300 text-red-300 max-w-4xl lg:max-w-none',
            styles.title
          )}
        >
          {title}
        </h1>

        <Button onClick={onClose} priority>
          {t('cta')}
          <span className="text-red-300 ml-4">→</span>
        </Button>
      </div>

      <div className="-ml-96 md:ml-0 -mr-96 -mt-48 md:mt-0 -mb-16 md:mb-0 md:mr-0 md:absolute md:top-36 xl:top-64 md:left-16 md:w-4/5 xl:left-48 xl:w-9/12">
        <CityShape image={introImage} />
      </div>

      <div className="md:absolute md:bottom-8 md:left-8 max-w-3xl lg:max-w-5xl px-8">
        <Markdown>{intro}</Markdown>
      </div>

      <div className="md:absolute md:right-8 md:top-0 px-8 md:py-12 lg:py-16 xl:py-28 md:space-y-4 xl:space-y-8 md:h-screen justify-between md:flex md:flex-col">
        <p className="leading-tight font-raptor md:max-w-xs md:text-right text-s lg:text-m">
          <Count href="/" count={featuredCitiesCount} className="text-red-300" onClick={onClose} />{' '}
          {t('withCaseStudies')}
        </p>

        <p className="leading-tight font-raptor md:max-w-xs md:text-right text-s lg:text-m">
          <Count href={`/${tSlugs('cities')}`} count={citiesCount} className="text-pink-300" />{' '}
          {t('withSolidarityBasedPolicy')}
        </p>

        <p className="leading-tight font-raptor md:max-w-xs md:text-right text-s lg:text-m">
          <Count href={`/${tSlugs('networks')}`} count={networksCount} className="text-red-300" />{' '}
          {t('europeanNetworks')}
        </p>

        <p className="leading-tight font-raptor md:max-w-xs md:text-right text-s lg:text-m">
          <Count
            href={`/${tSlugs('approaches')}`}
            count={approachesCount}
            className="text-pink-300"
          />
          {t('inspiringApproaches')}
        </p>
      </div>
    </div>
  );
}
