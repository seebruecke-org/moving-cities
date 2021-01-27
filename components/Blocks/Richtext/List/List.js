import * as styles from './list.styles';

export default function List({ type = 'unordered', children }) {
  const Tag = type === 'unordered' ? 'ul' : 'ol';

  return <Tag css={styles.list}>{children}</Tag>;
}
