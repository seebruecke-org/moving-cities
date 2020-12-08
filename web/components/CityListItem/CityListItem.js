import Link from 'next/link';

import * as styles from './cityListItem.styles';

const CityListItem = ({ name }) => <Link href="/">
  <a css={styles.name}>
    {name}
  </a>
</Link>;

export default CityListItem;
