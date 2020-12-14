import { css } from '@emotion/react';

import boxShadow from '../../lib/styles/box-shadow';
import zIndex from '../../lib/styles/z-index';

export const sidebar = css`
  ${boxShadow()}
  ${zIndex('sidebarBack')}
  grid-area: sidebar;
  z-index: 100;

  @media (min-width: 768px) {
    position: relative;
  }
`;

export const sidebarContent = css`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 768px) {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
  }
`
