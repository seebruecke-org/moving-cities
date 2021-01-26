import Blocks from '../Blocks';

import * as styles from './page.styles';

export default function Page({ title, content = [] }) {
  return (
    <article css={styles.container}>
      <h1 css={styles.title}>{title}</h1>

      <div css={styles.contentContainer}>
        <Blocks blocks={content} />
      </div>
    </article>
  );
}
