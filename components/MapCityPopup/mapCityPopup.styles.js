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

  background: white;
  border-radius: 2rem;
  font-family: var(--font-sans);
  max-width: 30rem;
  padding: 2.25rem;
  position: relative;
`;

export const header = css`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const title = css`
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0;
  margin-top: 0;
`;

export const intro = css`
  font-size: 1.3rem;
`;

export const cta = css`
  border: 1px solid currentColor;
  border-radius: 2rem;
  cursor: pointer;
  display: inline-block;
  margin-top: 1rem;
  padding: 0.35rem 1rem;

  :hover,
  :focus {
    background-color: var(--color-red);
  }
`;

export const close = css`
  background: transparent;
  border: 0;
  color: black;
  height: auto;
  margin-left: 2rem;
  padding: 0;
  width: 3.25rem;

  :hover,
  :focus {
    color: var(--color-red);
    cursor: pointer;
  }
`;

export const closeIcon = css`
  height: auto;
  width: 100%;
`
