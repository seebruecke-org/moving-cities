import { css } from '@emotion/react';

import boxShadow from '../../lib/styles/box-shadow';
import zIndex from '../../lib/styles/z-index';

export const container =  css`
  ${boxShadow()}

  background-color: white;
  height: 100vh;
  position: fixed;
  top: 100%;
  touch-action: none;
  width: 100%;
  z-index: ${zIndex.overlay};

  @media (min-width: 768px) {
    display: flex;
    flex: 1;
    position: static;
  }
`;

export const handle = css`
  border-top: 0.25rem solid var(--color-blue);
  height: 0.1rem;
  left: 50%;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  position: absolute;
  top: 0.5rem;
  transform: translateX(-50%);
  width: 50%;

  @media (min-width: 768px) {
    display: none;
  }
`;
