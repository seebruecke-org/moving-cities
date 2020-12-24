import * as styles from './quote.styles';

export default function Quote({ text, author }) {
    return (
        <blockquote css={styles.container}>
            <p css={styles.text}>"{text}"</p>

            {author && (
                <cite css={styles.author}>
                    {author}
                </cite>
            )}
        </blockquote>
    )
}
