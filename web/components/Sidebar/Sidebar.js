import * as styles from './sidebar.styles';

const Sidebar = ({ children }) => (
  <aside css={styles.sidebar}>
    {children}
  </aside>
);

export default Sidebar;
