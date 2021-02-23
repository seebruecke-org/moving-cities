import Link from 'next/link';

import * as styles from './cityListItem.styles';

const CityListItem = ({
  name,
  isActive,
  isHighlighted,
  slug,
  country: { slug: countrySlug },
  onClick = () => {},
  ...props
}) => {
  return (
    <Link href={`/cities/${countrySlug}/${slug}`} passHref>
      <a
        css={[styles.name, (isActive || isHighlighted) && styles.active]}
        onClick={onClick}
        {...props}>
        {name}
      </a>
    </Link>
  );
};

export default CityListItem;
