import { useTranslation } from 'next-i18next';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/Button';
import Markdown from '@/components/Markdown';
import Paragraph from '@/components/Paragraph';

import introImage from '@/public/images/intro.png';

import styles from './styles.module.css';

function Count({ count, className, onClick = () => {}, ...props }) {
  return (
    <Link {...props}>
      <a
        className={clsx('font-raptor text-6xl font-bold underline block', className)}
        onClick={onClick}>
        {count}
      </a>
    </Link>
  );
}

export default function Intro({ onClose = () => {}, title, intro }) {
  const { t } = useTranslation('intro');
  const { t: tSlugs } = useTranslation('slugs');

  return (
    <div className="relative w-full h-screen overflow-x-hidden">
      <div className="relative md:absolute md:top-8 md:left-8 z-10 md:max-w-3xl px-8 pt-12">
        <h1 className={clsx("font-raptor text-5xl font-bold leading-none mb-12 bg-clip-text bg-gradient-to-b from-red-300 to-pink-300 text-red-300", styles.title)}>
          {title}
        </h1>

        <Button onClick={onClose} priority>
          {t('cta')}
          <span className="text-red-300 ml-4">→</span>
        </Button>
      </div>

      <div className="-ml-96 md:ml-0 -mr-96 -mt-48 md:mt-0 -mb-16 md:mb-0 md:mr-0 md:absolute md:top-56 md:left-16 md:w-4/5">
        <Image src={introImage} priority placeholder="blur" />
      </div>

      <div className="md:absolute md:bottom-8 md:left-8 md:max-w-5xl px-8">
        <Markdown>{intro}</Markdown>
      </div>

      <div className="md:absolute md:right-8 md:top-0 px-8 space-y-8 pb-28 md:h-screen justify-between md:flex md:flex-col">
        <Paragraph className="md:max-w-xs md:text-right">
          <Count href="/" count={29} className="text-red-300" onClick={onClose} />{' '}
          {t('withCaseStudies')}
        </Paragraph>

        <Paragraph className="md:max-w-xs md:text-right">
          <Count href={`/${tSlugs('cities')}`} count={684} className="text-pink-300" />{' '}
          {t('withSolidarityBasedPolicy')}
        </Paragraph>

        <Paragraph className="md:max-w-xs md:text-right">
          <Count href={`/${tSlugs('networks')}`} count={11} className="text-red-300" />{' '}
          {t('europeanNetworks')}
        </Paragraph>

        <Paragraph className="md:max-w-xs md:text-right">
          <Count href={`/${tSlugs('approaches')}`} count={55} className="text-pink-300" />
          {t('inspiringApproaches')}
        </Paragraph>
      </div>
    </div>
  );
}
