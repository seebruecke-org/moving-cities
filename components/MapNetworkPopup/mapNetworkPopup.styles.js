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
  font-family: var(--font-sans);
  max-width: 30rem;
`;

export const title = css`
  font-size: 1.75rem;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 0;
  margin-top: 0;
`;

export const icon = css`
  margin-left: 1rem;
`;

export const cta = css`
  ${boxShadow()}

  align-items: center;
  background-color: var(--color-red);
  border-radius: 1.5rem;
  cursor: pointer;
  display: flex;
  padding: 0.75rem 1.5rem;

  :hover,
  :focus {
    background-color: black;
    color: white;
  }
`;
