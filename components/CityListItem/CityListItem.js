import Link from 'next/link';

import * as styles from './cityListItem.styles';

const CityListItem = ({
  name,
  isActive,
  slug,
  country: { slug: countrySlug },
  onClick = () => {},
  ...props
}) => {
  const href = `/cities/${countrySlug}/${slug}`;

  return (
    <Link href={href}>
      <a href={href} css={[styles.name, isActive && styles.active]} onClick={onClick} {...props}>
        {name}
      </a>
    </Link>
  );
};

export default CityListItem;
