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

      const activityTitle = blocks && blocks[0]?.activity?.title;

      return {
        title: activityTitle || i18n.t(`chapter.title-${index + 1}`),
        blocks
      };
    })
    .filter(Boolean);

  return (
    <div css={styles.container}>
      <h1 css={styles.title}>{name}</h1>

      <Link href={`/${i18n.t('city.slug')}/${country.slug}`}>
        <a>{i18n.t('city.Country Profile')}</a>
      </Link>

      <div css={styles.blocksContainer}>
        <Blocks blocks={intro_long} />
      </div>

      <ChapterList chapter={chapter} />
    </div>
  );
}
