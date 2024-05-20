import { useTranslation } from 'next-i18next';
import clsx from 'clsx';

import Approach from '@/components/Approach';
import Button from '@/components/Button';
import CityIcon from '@/components/CityIcon';
import Heading from '@/components/Heading';
import Markdown from '@/components/Markdown';
import { buildCMSUrl } from '@/lib/api';

export default function CityPreview({
  title,
  subtitle,
  uri,
  reportFile,
  icon,
  approaches,
  summary,
  onClose = () => {}
}) {
  const { t } = useTranslation('city');
  const { t: tApproaches } = useTranslation('approaches');

  return (
    <article className="bg-yellow-300 px-10 pt-16 pb-16 h-full overflow-y-auto flex flex-col xl:min-w-8xl">
      <div className="flex mb-6 xl:mb-24 items-start">
        {icon && <CityIcon icon={icon} className="w-48 xl:w-72 mr-6 xl:mr-12" />}

        <div className="mr-8">
          <h1 className="text-red-300 text-4xl xl:text-5xl font-raptor font-bold leading-none mb-4">
            {title}
          </h1>

          <p className="text-2xl xl:text-3xl leading-none font-raptor font-medium md:font-bold">
            {subtitle}
          </p>
        </div>

        <button onClick={onClose} className="group font-raptor font-semibold font-2xs mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="37"
            height="37"
            viewBox="0 0 37 37"
            className="group-hover:text-red-300"
          >
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

      <div className="flex flex-col space-y-8 mt-8 xl:mt-16">
        <Heading level={2} as={3}>
          {summary.title}
        </Heading>

        <Markdown isSmall>{summary.content}</Markdown>

        {uri && (
          <Button href={uri} className="w-auto self-start">
            <span>{t('viewCity')}</span>
            <span className="text-red-300 ml-4 text-xl leading-none">→</span>
          </Button>
        )}
        {reportFile && (
          <Button
            href={buildCMSUrl(reportFile.url)}
            className="self-start mt-8 w-auto"
            target="_blank"
            rel="noreferrer"
          >
            {t('download.cta')}
            <span className="text-red-300 ml-4">⤓</span>
          </Button>
        )}

        {approaches?.length > 0 && (
          <div className="space-y-8 pt-12">
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
