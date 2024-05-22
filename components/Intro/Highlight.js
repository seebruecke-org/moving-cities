import { useTranslation } from 'next-i18next';
import Link from 'next/link';

export default function Highlight({ highlight }) {
  const { t } = useTranslation('intro');
  const { t: tSlugs } = useTranslation('slugs');
  const { t: tCommon } = useTranslation('common');

  const createUrl = () => {
    switch (highlight.__typename) {
      case 'ComponentIntroHighlightApproach':
        return `/${highlight.approach.city.slug}/${highlight.approach.slug}`;
      case 'ComponentIntroHighlightCity':
        return `/${highlight.city.slug}`;
      case 'ComponentIntroHighlightNetwork':
        return `/${tSlugs('networks')}/${highlight.network.slug}`;
      case 'ComponentIntroHighlightNewsEntry':
        return `/${tSlugs('news')}/${highlight.news_entry.slug}`;
      default:
        return '';
    }
  };

  return (
    <div className="border border-grey-300 rounded-xl p-6 w-full md:w-[400px]">
      <h4 className="font-raptor font-light underline text-xxs text-opacity-80">
        {t('highlight')}
      </h4>
      <div className="my-3 font-raptor font-bold text-xs">{highlight.title}</div>
      <Link href={createUrl()}>
        <a className="font-raptor lg:hover:text-red-300">
          {tCommon('readMore')}
          <span className="ml-2">⟶</span>
        </a>
      </Link>
    </div>
  );
}
