import Link from 'next/link';

import * as styles from './cityListItem.styles';

const CityListItem = ({ name, isActive, ...props }) => {
  return <Link href="/">
    <a css={[styles.name, isActive && styles.active]} {...props}>
      {name}
    </a>
  </Link>;
}

export default CityListItem;
