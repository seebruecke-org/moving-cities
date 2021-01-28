import { css } from '@emotion/react';

export const form = css`
  height: 100%;
  position: relative;
  width: 100%;
`;

export const footer = css`
  bottom: 0;
  left: 0;
  padding: 1.5rem;
  position: absolute;
  width: 100%;
`;

export const button = css`
  background: white;
  border: 1px solid currentColor;
  border-radius: 2rem;
  cursor: pointer;
  line-height: 1;
  padding: 0.75rem 2rem;

  :hover,
  :focus {
    background: var(--color-red);
  }
`;
