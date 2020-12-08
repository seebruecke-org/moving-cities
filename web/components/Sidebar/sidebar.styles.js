import { css } from '@emotion/react';

import boxShadow from '../../lib/styles/box-shadow';
import zIndex from '../../lib/styles/z-index';

export const sidebar = css`
  ${boxShadow()}
  ${zIndex('sidebarBack')}
  grid-area: sidebar;
  position: relative;

  @media (max-width: 768x) {
    grid-column: 1 / span 12;
  }
`;

export const sidebarContent = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`
