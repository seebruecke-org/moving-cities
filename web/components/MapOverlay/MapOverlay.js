import * as styles from './mapOverlay.styles';

const MapOverlay = ({ children }) => <div css={styles.container}>
  <div css={styles.inner}>
    {children}
  </div>
</div>;

export default MapOverlay;
