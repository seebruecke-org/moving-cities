import Blocks from '../Blocks';

import * as styles from './page.styles';

export default function Page({ title, content = [] }) {
  return (
    <article css={styles.container}>
      <h1>{title}</h1>

      <Blocks blocks={content} />
    </article>
  );
}
