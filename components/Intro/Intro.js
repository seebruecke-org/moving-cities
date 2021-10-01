import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/Button';
import Markdown from '@/components/Markdown';

import introImage from '@/public/images/intro.jpg';

import styles from './styles.module.css';

function CityShape({ image }) {
  const duration = 3500;
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
      <Image src={image} priority placeholder="blur" className={styles.image} />

      <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
        <defs>
          <clipPath id="image-intro-clip" clipPathUnits="objectBoundingBox">
            <animated.path
              d={x.to({
                range: [0, 1],
                output: [
                  'M0.050069541029207 0.31105398457584c0-0.084832904884319 0.030598052851182-0.18251928020566 0.080667593880389-0.18251928020566 0.10570236439499 0 0.11682892906815 0.23393316195373 0.17663421418637 0.23393316195373 0.054242002781641 0 0.079276773296245-0.3573264781491 0.13630041724618-0.3573264781491 0.055632823365786 0 0.023643949930459 0.23136246786632 0.082058414464534 0.24678663239075s0.072322670375522-0.15938303341902 0.13490959666203-0.18766066838046c0.066759388038943-0.030848329048843 0.054242002781641 0.082262210796915 0.15438108484006 0.11825192802057 0.10987482614743 0.041131105398458 0.13351877607789-0.095115681233933 0.17107093184979-0.038560411311054 0.023643949930459 0.03598971722365-0.0069541029207232 0.17223650385604-0.025034770514604 0.24421593830334-0.026425591098748 0.10025706940874-0.0027816411682893 0.15681233933162 0.029207232267038 0.2853470437018s-0.030598052851182 0.12339331619537-0.10013908205841 0.082262210796915-0.031988873435327 0.19280205655527-0.09874826147427 0.23393316195373c-0.082058414464534 0.048843187660668-0.023643949930459-0.14652956298201-0.05702364394993-0.31619537275064-0.031988873435327-0.16195372750643-0.11961057023644 0.066838046272494-0.16133518776078 0.066838046272494-0.0778859527121 0-0.063977746870654-0.14910025706941-0.11404728789986-0.19537275064267-0.044506258692629-0.043701799485861-0.11404728789986 0.26478149100257-0.16411682892907 0.26478149100257-0.051460361613352 0-0.019471488178025-0.10796915167095-0.068150208623088-0.16195372750643s-0.14464534075104 0.12339331619537-0.20723226703755 0.023136246786632c-0.052851182197497-0.084832904884319 0.030598052851182-0.15167095115681 0.030598052851182-0.3598971722365z',

                  'M0.050069541029207 0.31105398457584c0-0.084832904884319 0.052851182197497-0.2107969151671 0.1029207232267-0.2107969151671 0.10570236439499 0 0.086230876216968 0.26221079691517 0.14603616133519 0.26221079691517 0.054242002781641 0 0.048678720445063-0.30591259640103 0.10570236439499-0.30591259640103 0.055632823365786 0 0.080667593880389 0.18766066838046 0.13908205841446 0.20308483290488s0.054242002781641-0.16709511568123 0.11682892906815-0.19537275064267c0.066759388038943-0.030848329048843 0.069541029207232 0.13367609254499 0.16968011126565 0.16966580976864 0.10987482614743 0.041131105398458 0.11821974965229-0.14652956298201 0.1557719054242-0.089974293059126 0.023643949930459 0.03598971722365-0.0069541029207232 0.17223650385604-0.025034770514604 0.24421593830334-0.026425591098748 0.10025706940874-0.0027816411682893 0.15681233933162 0.029207232267038 0.2853470437018s-0.030598052851182 0.12339331619537-0.10013908205841 0.082262210796915-0.031988873435327 0.19280205655527-0.09874826147427 0.23393316195373c-0.082058414464534 0.048843187660668-0.037552155771905-0.11825192802057-0.070931849791377-0.2879177377892-0.031988873435327-0.16195372750643-0.10987482614743 0.069408740359897-0.15159944367177 0.069408740359897-0.0778859527121 0-0.084840055632823-0.19794344473008-0.13490959666203-0.24421593830334-0.044506258692629-0.043701799485861-0.058414464534075 0.2827763496144-0.10848400556328 0.2827763496144-0.051460361613352 0-0.050069541029207-0.10796915167095-0.09874826147427-0.16195372750643s-0.14464534075104 0.12339331619537-0.20723226703755 0.023136246786632c-0.052851182197497-0.084832904884319 0.030598052851182-0.15167095115681 0.030598052851182-0.3598971722365z'
                ]
              })}
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Count({ count, className, onClick = () => {}, ...props }) {
  return (
    <Link {...props}>
      <a
        className={clsx(
          'font-raptor text-4xl md:text-5xl font-bold underline block hover:text-black',
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

      <div className="-ml-96 md:ml-0 -mr-96 -mt-48 md:mt-0 -mb-16 md:mb-0 md:mr-0 md:absolute md:top-24 lg:top-36 xl:top-64 md:left-10 md:w-4/5 xl:left-48 xl:w-9/12">
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
