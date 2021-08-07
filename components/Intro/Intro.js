import { useTranslation } from 'next-i18next';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/Button';
import Paragraph from '@/components/Paragraph';

import intro from '@/public/images/intro.png';

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

export default function Intro({ onClose = () => {} }) {
  const { t } = useTranslation('intro');

  return (
    <div className="relative w-full space-y-8 h-screen">
      <div className="md:absolute md:top-8 md:left-8 z-10 md:max-w-3xl px-8 pt-12">
        <h1 className="font-raptor text-4xl font-bold leading-none mb-4">{t('title')}</h1>

        <Button onClick={onClose} priority>
          {t('cta')}
        </Button>
      </div>

      <div className="md:absolute md:top-0 md:right-72 md:w-full">
        <Image src={intro} priority placeholder="blur" />
      </div>

      <Paragraph className="md:absolute md:bottom-8 md:left-8 md:max-w-3xl px-8">
        {t('intro')}
      </Paragraph>

      <div className="md:absolute md:right-8 md:top-0 px-8 space-y-8 pb-28">
        <Paragraph className="md:max-w-xs md:text-right">
          <Count href="/" count={29} className="text-red-300" onClick={onClose} />{' '}
          {t('withCaseStudies')}
        </Paragraph>

        <Paragraph className="md:max-w-xs md:text-right">
          <Count href="/cities" count={684} className="text-pink-300" />{' '}
          {t('withSolidarityBasedPolicy')}
        </Paragraph>

        <Paragraph className="md:max-w-xs md:text-right">
          <Count href="/networks" count={11} className="text-red-300" /> {t('europeanNetworks')}
        </Paragraph>

        <Paragraph className="md:max-w-xs md:text-right">
          <Count href="/approaches" count={55} className="text-pink-300" />
          {t('inspiringApproaches')}
        </Paragraph>
      </div>
    </div>
  );
}
