import { css } from '@emotion/react';

import boxShadow from '../../lib/styles/box-shadow';
import zIndex from '../../lib/styles/z-index';

export const container = css`
  ${zIndex('mapOverlay')}

  display: flex;
  height: 100%;
  left: 0;
  overflow-x: hidden;
  position: absolute;
  right: 0;
  top: 0;

  @media (min-width: 768px) {
    left: 2.75rem;
    padding-left: 0.8rem;
  }
`;

export const inner = css`
  ${boxShadow()}

  background: white;
  min-height: 100%;
  overflow-y: auto;
  padding: 1.5rem;
  width: 100%;

  @media (min-width: 768px) {
    padding: 5rem 9rem;
  }
`;
