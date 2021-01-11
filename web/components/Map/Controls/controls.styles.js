import { css } from '@emotion/react';

import zIndex from '../../../lib/styles/z-index';

export const BORDER_RADIUS = '0.75rem';

export const container = css`
  ${zIndex('mapOverlay')}

  align-items: center;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 2rem;
  top: 2rem;
`;
