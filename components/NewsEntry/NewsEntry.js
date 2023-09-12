import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import Heading from '@/components/Heading';

export default function NewsEntry({ title, teaser, region, uri }) {
  const { t: tNews } = useTranslation('news');

  return (
    <Link href={uri}>
      <a className="flex flex-col rounded-xl p-6 h-full bg-gradient-to-br from-red-300 to-pink-300">
        <Heading level={3} as={4} className="[word-break:break-word]">
          {region && (
            <span className="block text-s mb-4 font-normal">
              {region}
              <span className="sr-only">:</span>
            </span>
          )}

          {title}
        </Heading>

        <p className="mt-3 mb-10 font-raptor text-s leading-normal">{teaser}</p>

        <button
          type="button"
          tabIndex="-1"
          className="font-raptor font-bold text-s mt-auto justify-end self-start"
        >
          {tNews('readMore')}
          <span className="text-white ml-2">⟶</span>
        </button>
      </a>
    </Link>
  );
}
