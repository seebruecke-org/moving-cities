import { Children } from 'react';

import * as styles from './sidebarList.styles';

const SidebarList = ({ label, children, ...props }) => {
  const childrenArr = Children.toArray(children);

  return (
    <div css={styles.container}>
      <h2 css={styles.label}>{label}</h2>

      <div css={styles.listContainer}>
        <ul css={styles.list} {...props}>
          {childrenArr.map((child, index) => (
            <li key={`sidebar-item-${index}`}>{child}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarList;
