import Paragraph from '@/components/Paragraph';

import styles from './styles.module.css';

export default function ListItem({ children, isSmall }) {
  return (
    <li className={styles.item}>
      <Paragraph isSmall={isSmall}>{children}</Paragraph>
    </li>
  );
}
