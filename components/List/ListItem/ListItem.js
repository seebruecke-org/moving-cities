import Paragraph from '@/components/Paragraph';

import styles from './styles.module.css';

export default function ListItem({ children, isSmall }) {
  return (
    <li className={styles.item}>
      {/* for future reference: with display block, the list-icon doesn't
          render in Safari */}
      <Paragraph isSmall={isSmall} className="block">{children}</Paragraph>
    </li>
  );
}
