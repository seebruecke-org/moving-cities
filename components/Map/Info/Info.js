import * as styles from './info.styles';

export default function Info(props) {
  return (
    <button type="button" css={styles.button} {...props}>
      <span css={styles.text}>i</span>
    </button>
  );
}
