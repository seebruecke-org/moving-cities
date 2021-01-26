import { css } from '@emotion/react';

export const name = css`
  cursor: pointer;
  display: block;
  font-size: 1.6rem;
  line-height: 1.3;
  padding: 1rem 1.5rem;
  width: 100%;

  :hover,
  :focus {
    background-color: var(--color-red);
  }
`;
