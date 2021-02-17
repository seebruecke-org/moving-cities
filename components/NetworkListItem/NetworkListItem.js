import Link from 'next/link';

import * as styles from './networkListItem.styles';

const NetworkListItem = ({ name, slug, isActive = false, onClick = () => {}, ...props }) => {
  const href = `/networks/${slug}/`;

  return (
    <Link href={href}>
      <a href={href} css={[styles.name, isActive && styles.active]} onClick={onClick} {...props}>
        {name}
      </a>
    </Link>
  );
};

export default NetworkListItem;
