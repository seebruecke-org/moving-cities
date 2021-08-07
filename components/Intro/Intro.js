import clsx from 'clsx';
import Image from 'next/image';

import Button from '@/components/Button';
import Paragraph from '@/components/Paragraph';

import intro from '@/public/images/intro.png';

function Count({ count, className }) {
  return (
    <span className={clsx('font-raptor text-6xl font-bold underline block', className)}>
      {count}
    </span>
  );
}

export default function Intro({ onClose = () => {} }) {
  return (
    <div className="relative w-full space-y-8 h-screen">
      <div className="md:absolute md:top-8 md:left-8 z-10 md:max-w-3xl px-8 pt-12">
        <h1 className="font-raptor text-4xl font-bold leading-none mb-4">
          Another migration policy is possible
        </h1>

        <Button onClick={onClose} priority>
          Check out cities
        </Button>
      </div>

      <div className="md:absolute md:top-0 md:right-72 md:w-full">
        <Image src={intro} />
      </div>

      <Paragraph className="md:absolute md:bottom-8 md:left-8 md:max-w-3xl px-8">
        Since 2004 cities and activists started pushing their own policies for cities which are open
        welcoming to refugees ... Currently 600 European cities are actively supporting a
        solidarity-based migration policy.
      </Paragraph>

      <div className="md:absolute md:right-8 md:top-0 px-8 space-y-8 pb-28">
        <Paragraph className="md:max-w-xs md:text-right">
          <Count count={29} className="text-red-300" /> Featured Cities with Case Studies
        </Paragraph>

        <Paragraph className="md:max-w-xs md:text-right">
          <Count count={684} className="text-pink-300" /> Cities actively supporting a
          solidarity-based migration policy
        </Paragraph>

        <Paragraph className="md:max-w-xs md:text-right">
          <Count count={11} className="text-red-300" /> European Networks
        </Paragraph>

        <Paragraph className="md:max-w-xs md:text-right">
          <Count count={55} className="text-pink-300" />
          Inspiring Approaches
        </Paragraph>
      </div>
    </div>
  );
}
