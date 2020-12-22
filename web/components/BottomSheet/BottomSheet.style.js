import { css } from '@emotion/react';

import boxShadow from '../../lib/styles/box-shadow';
import zIndex from '../../lib/styles/z-index';

export const container =  css`
  ${boxShadow()}

  background-color: white;
  height: 100vh;
  padding-top: 1rem;
  position: fixed;
  top: 100%;
  touch-action: none;
  width: 100%;
  z-index: ${zIndex.overlay};

  @media (max-width: 768px) {
    border-radius: 1rem;
  }

  @media (min-width: 768px) {
    display: flex;
    flex: 1;
    position: static;
  }

  ::before {
    background-color: var(--color-grey-medium);
    border-radius: 0.4rem;
    content: '';
    height: 0.4rem;
    left: 50%;
    position: absolute;
    top: 1.3rem;
    transform: translateX(-50%);
    width: 4.7rem;

    @media (min-width: 768px) {
      display: none;
    }
  }
`;
