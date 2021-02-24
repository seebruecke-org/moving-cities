import { css } from '@emotion/react';

export const form = css`
  height: 100%;
  width: 100%;
`;

export const footer = css`
  padding: 1.25rem 1.5rem;
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
