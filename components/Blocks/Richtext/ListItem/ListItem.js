import Paragraph from '../Paragraph';

import * as styles from './listItem.styles';

export default function ListItemBlock({ children }) {
  return (
    <li css={styles.item}>
      <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg" css={styles.icon}>
        <circle cx="4.58594" cy="4" r="4" fill="currentColor"/>
      </svg>

      <Paragraph css={styles.content}>{children}</Paragraph>
    </li>
  );
}
