import Blocks from '../Blocks';

import * as styles from './networkProfile.styles';

export default function NetworkProfile({ name, content }) {
  return (
    <div css={styles.container}>
      <h1 css={styles.title}>{name}</h1>

      <div css={styles.blocksContainer}>
        <Blocks blocks={content} />
      </div>
    </div>
  );
}
