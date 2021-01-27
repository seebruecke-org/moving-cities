import { css } from '@emotion/react';

import zIndex from '../../lib/styles/z-index';

export const container = css`
  ${zIndex('sidebarFront')}

  left: 0;
  max-width: 40rem;
  padding: 3rem;
  position: absolute;
  top: 0;

  > * + * {
    margin-top: 1.5rem;
  }
`;
