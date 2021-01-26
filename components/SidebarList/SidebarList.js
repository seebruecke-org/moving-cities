import { Children } from 'react';

import * as styles from './sidebarList.styles';

const SidebarList = ({ label, children, ...props }) => (
  <div css={styles.container}>
    <h2 css={styles.label}>{label}</h2>

    <div css={styles.listContainer}>
      <ul css={styles.list} {...props}>
        {Children.map(children, (child) => (
          <li>{child}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default SidebarList;
