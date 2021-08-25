import { useTranslation } from 'next-i18next';

import Approach from '@/components/Approach';
import Button from '@/components/Button';
import Heading from '@/components/Heading';
import Markdown from '@/components/Markdown';

export default function CityPreview({
  title,
  subtitle,
  uri,
  approaches,
  summary,
  onClose = () => {}
}) {
  const { t } = useTranslation('city');
  const { t: tApproaches } = useTranslation('approaches');

  return (
    <article className="bg-yellow-300 px-10 pt-16 pb-16 h-full overflow-y-auto flex flex-col">
      <div className="flex mb-10 items-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="180"
          height="206"
          viewBox="0 0 180 206"
          className="text-white mr-8 -mt-8">
          <path
            fill="currentColor"
            d="M67 19l25-6 16-10 3-3 10 8 10 23-10 16 16 27 18-4 8-6h3v10h14l-5 10 5 6-14 6-3 4h-8l8 18 3 22v9h-3v7l3 12-3 15-18-5-14-10-6 10h-10l-4-10-3 6-4 1-12-7h-5l-8 6H59l-10-6h-7c2 4 5 10 0 6-4-5 3-10 7-12v-13h6l4-9 8-5v-13l-4-4v-6l-11-9 3-7 4-18-17-25-4-6V35h-8l-6-4H14l-9 4-5-11 5-11-5-5h10l4-5 5 5 11 5v6h8l4-6h13l-3-5 11-8 8 8v5l-4 6z"
          />
          <path
            fill="currentColor"
            d="M33 99h-7v2l-5-2-2 2-2-2v2l-4 2-4 2 7 2 3-1v2l-3 5-2-1v2l-7 4 2 4 2-3h2l1-2 3-2 1-2 4-1 3-4-5-1-1-1h2l1-3 4 2 2-2v-2l2 1 3-3zM59 179v4l6 4-6-8zM85 203l-10-5H65l2 5h5l7 3h4l2-3zM75 193l-3-4h3l4 4h-4z"
          />
        </svg>

        <div className="mr-8">
          <h1 className="text-red-300 text-6xl font-raptor font-bold leading-none">{title}</h1>

          <p className="text-4xl leading-none font-raptor font-bold">{subtitle}</p>
        </div>

        <button onClick={onClose} className="group font-raptor font-semibold mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="37"
            height="37"
            viewBox="0 0 37 37"
            className="group-hover:text-red-300">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="3"
              d="M3.6 3.5l30 30M3.6 33.5l30-30"
            />
          </svg>
          {t('close')}
        </button>
      </div>

      <div className="flex flex-col space-y-8">
        <Heading level={2} as={3}>
          {summary.title}
        </Heading>

        <Markdown>{summary.content}</Markdown>

        {uri && (
          <Button href={uri} className="w-auto self-start">
            {t('viewCity')}
            <span className="text-red-300 ml-3 text-4xl leading-none -my-4">→</span>
          </Button>
        )}

        {approaches && (
          <div className="space-y-8 pt-4">
            <Heading level={2} as={3}>
              {tApproaches('inspiringApproaches')}
            </Heading>

            <ul className="space-y-8">
              {approaches.map((approach) => (
                <li>
                  <Approach {...approach} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
