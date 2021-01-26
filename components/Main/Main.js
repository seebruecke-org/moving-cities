import * as styles from './main.styles';

const Main = ({ children }) => (
  <main css={styles.container}>
    <div css={styles.inner}>{children}</div>
  </main>
);

export default Main;
