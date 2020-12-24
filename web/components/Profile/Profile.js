import Link from 'next/link';

import Blocks from '../Blocks';
import ChapterList from '../ChapterList';

import * as styles from './profile.styles';

export default function Profile({ name, isCity, intro_long, country, chapter_1, chapter_2, chapter_3 }) {
    const chapterList = [chapter_1, chapter_2, chapter_3];
    const chapter = chapterList.map((blocks, index) => {
        if (!blocks || blocks.length === 0) {
            return null;
        }

        return {
            title: `Chapter ${index + 1}`,
            blocks
        }

    }).filter(Boolean)

    return (
        <div css={styles.container}>
            <h1 css={styles.title}>{name}</h1>

            {isCity && (
                <Link href={`/cities/${country.slug}`}>
                    <a>
                        Country Profile
                    </a>
                </Link>
            )}

            <div css={styles.blocksContainer}>
                <Blocks blocks={intro_long} />
            </div>

            <ChapterList chapter={chapter} />
        </div>
    )
};
