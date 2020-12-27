import * as styles from './heading.styles';

export default function Heading({ level = 1, children }) {
    const Tag = `h${level}`;

    return <Tag css={styles[Tag]}>
        {children}
    </Tag>
}
