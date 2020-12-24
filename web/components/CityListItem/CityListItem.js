import Link from 'next/link';

import * as styles from './cityListItem.styles';

const CityListItem = ({
  name,
  isActive,
  slug,
  country: { slug: countrySlug },
  onClick = () => {}
}) => {
  const href = `/cities/${countrySlug}/${slug}`;

  return (
    <Link href={href}>
      <a css={[styles.name, isActive && styles.active]} onClick={onClick}>
        {name}
      </a>
    </Link>
  );
};

export default CityListItem;
