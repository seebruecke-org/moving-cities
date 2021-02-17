import { css } from '@emotion/react';

import boxShadow from '../../lib/styles/box-shadow';

export const resetPopup = css`
  .mapboxgl-popup-content {
    background: transparent;
    border-radius: 0;
    padding: 0;
  }

  .mapboxgl-popup-tip {
    display: none;
  }
`;

export const container = css`
  ${boxShadow()}

  background: var(--color-red);
  border-radius: 1.5rem;
  font-family: var(--font-sans);
  max-width: 30rem;
  padding: 0.75rem 1.5rem;
`;

export const title = css`
  font-size: 1.75rem;
  line-height: 1.2;
  margin-bottom: 0;
  margin-top: 0;
`;

export const icon = css`
  margin-left: 1rem;
`;

export const cta = css`
  align-items: center;
  cursor: pointer;
  display: flex;
`;
