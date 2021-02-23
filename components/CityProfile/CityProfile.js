import { useI18n } from 'next-localization';
import Link from 'next/link';

import Blocks from '../Blocks';
import ChapterList from '../ChapterList';

import * as styles from './cityProfile.styles';

export default function CityProfile({
  name,
  intro_long,
  country,
  chapter_1,
  chapter_2,
  chapter_3,
  chapter_4
}) {
  const i18n = useI18n();
  const chapterList = [chapter_1, chapter_2, chapter_3, chapter_4];
  const chapter = chapterList
    .map((blocks, index) => {
      if (!blocks || blocks.length === 0) {
        return null;
      }

      return {
        title: i18n.t(`chapter.title-${index + 1}`),
        blocks
      };
    })
    .filter(Boolean);

  return (
    <div css={styles.container}>
      <h1 css={styles.title}>{name}</h1>

      <Link href={`/${i18n.t('city.slug')}/${country.slug}`}>
        <a css={styles.toCountryLink}>
          <svg
            width="19"
            height="14"
            viewBox="0 0 19 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            css={styles.toCountryProfileIcon}>
            <path stroke="currentColor" d="M11.47 12.7l6.18-6.18M11.7 1l6.17 6.18M16.94 6.8H0" />
          </svg>

          <span css={styles.toCountryProfileLabel}>
            {i18n.t('city.toCountryProfile', { name: country.name })}
          </span>
        </a>
      </Link>

      <div css={styles.blocksContainer}>
        <Blocks blocks={intro_long} />
      </div>

      <ChapterList chapter={chapter} />
    </div>
  );
}
