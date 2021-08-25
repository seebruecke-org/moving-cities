import clsx from 'clsx';

import styles from './styles.module.css';

export default function CityIcon({ icon, className }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: icon }}
      className={clsx(styles.icon, 'flex content-end flex-shrink-0', className)}
    />
  );
}
