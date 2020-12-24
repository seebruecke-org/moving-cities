import * as styles from './label.styles';

const Label = ({ children, ...props }) => (
  <label css={styles.label} {...props}>
    {children}
  </label>
);

export default Label;
