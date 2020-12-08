import { css } from '@emotion/react';
import * as styles from './sidebar.styles';

const Sidebar = ({ children }) => (
  <aside css={styles.sidebar}>
    <div css={styles.sidebarContent}>
      {children}
    </div>
  </aside>
);

export default Sidebar;
