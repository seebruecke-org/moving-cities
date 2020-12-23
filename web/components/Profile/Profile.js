import Link from 'next/link';

import Blocks from '../Blocks';

import * as styles from './profile.styles';

export default function Profile({ name, isCity, intro_long, country }) {
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

            {console.log(intro_long)}

            <Blocks blocks={intro_long} />
        </div>
    )
};
