import { css } from '@emotion/react';

import boxShadow from '../../lib/styles/box-shadow';
import zIndex from '../../lib/styles/z-index';

export const container = css`
  width: 100%;

  @media (max-width: 768px) {
    ${boxShadow()}
    ${zIndex('sidebarBack')}

    background-color: white;
    border-radius: 1rem;
    height: 100vh;
    padding-top: 1.5rem;
    position: fixed;
    top: 100%;
    touch-action: none;
  }

  @media (min-width: 768px) {
    display: flex;
    flex: 1;
  }

  ::before {
    background-color: var(--color-grey-light);
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
