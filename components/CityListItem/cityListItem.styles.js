import { css } from '@emotion/react';

export const name = css`
  cursor: pointer;
  display: block;
  font-size: 2.4rem;
  padding: 0.75rem 1.5rem;
  width: 100%;

  :hover,
  :focus {
    background-color: var(--color-purple);
  }
`;

export const active = css`
  background-color: var(--color-purple);
`;
