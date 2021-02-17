import Link from 'next/link';

import * as styles from './cityListItem.styles';

const CityListItem = ({
  name,
  isActive,
  isHighlighted,
  slug,
  country: { slug: countrySlug },
  onClick = () => {},
  accepts_more_refugees,
  ...props
}) => {
  const href = `/cities/${countrySlug}/${slug}`;

  return (
    <Link href={href}>
      <a
        href={href}
        css={[styles.name, (isActive || isHighlighted) && styles.active]}
        onClick={onClick}
        {...props}>
        {name}
      </a>
    </Link>
  );
};

export default CityListItem;
