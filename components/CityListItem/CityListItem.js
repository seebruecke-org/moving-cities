import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
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
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div css={styles.container}>
      <Link href={`/cities/${countrySlug}/${slug}`} passHref>
        <a
          css={[styles.name, (isActive || isHighlighted) && styles.active]}
          onClick={onClick}
          {...props}>
          {name}
        </a>
      </Link>

      {isActive && (
        <button
          type="button"
          css={styles.close}
          onClick={() => {
            if (router.asPath === '/') {
              dispatch({
                type: 'SET_ACTIVE_CITY',
                slug: null
              });
            } else {
              router.push('/');
            }
          }}
          aria-label="Back">
          <svg
            width="37"
            height="37"
            viewBox="0 0 37 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.7 23l1.2 1.2 4.9-4.9 4.9 4.9 1.2-1.2-4.9-5 4.9-4.8-1.2-1.2-5 4.9-4.8-5-1.2 1.3 4.9 4.9-5 4.9zM25.7 9.4L26.8 8a12.9 12.9 0 00-16 0l1 1.3c4-3.2 9.9-3.2 14 0zM27.5 25l1.3 1.1a12.9 12.9 0 000-16.1l-1.4 1c3.3 4.1 3.3 10 0 14zM10.1 11l-1.3-1a12.9 12.9 0 000 16.1l1.3-1c-3.3-4.2-3.2-10 0-14zM26.9 28l-1.1-1.3c-4 3.3-10 3.3-14 0L10.7 28a12.9 12.9 0 0016.2 0z"
              fill="#000"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default CityListItem;
