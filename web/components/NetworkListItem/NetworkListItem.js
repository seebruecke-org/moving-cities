import Link from 'next/link';

import * as styles from './networkListItem.styles';

const NetworkListItem = ({ name }) => <Link href="">
  <a css={styles.name}>
    {name}
  </a>
</Link>

export default NetworkListItem;
