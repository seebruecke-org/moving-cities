import React from 'react';

import * as styles from './mapOverlay.styles';

import BackToMap from '../BackToMap';

const MapOverlay = ({ children, backTo = '/' }) => (
  <>
    <BackToMap url={backTo} />
    <div css={styles.container}>
      <div css={styles.inner}>{children}</div>
    </div>
  </>
);

export default MapOverlay;
