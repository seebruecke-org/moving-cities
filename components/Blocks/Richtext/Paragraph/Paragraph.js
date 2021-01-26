import * as styles from './paragraph.styles';

export default function Paragraph({ children, ...props }) {
  return (
    <p css={styles.paragraph} {...props}>
      {children}
    </p>
  );
}
