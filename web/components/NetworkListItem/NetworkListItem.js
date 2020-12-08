import Link from 'next/link';

import * as styles from './networkListItem.styles';

const NetworkListItem = ({ title }) => <Link href="">
  <a css={styles.name}>
    {title}
  </a>
</Link>

export default NetworkListItem;
