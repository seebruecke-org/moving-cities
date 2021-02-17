import Link from 'next/link';

import * as styles from './networkListItem.styles';

const NetworkListItem = ({ name, slug, isActive = false, onClick = () => {}, ...props }) => {
  return (
    <Link href={`/networks/${slug}/`}>
      <a css={[styles.name, isActive && styles.active]} onClick={onClick} {...props}>
        {name}
      </a>
    </Link>
  );
};

export default NetworkListItem;
