import { css } from '@emotion/react';

export const container = css`
  background-color: var(--color-blue);
  color: white;
  overflow-y: auto;
  padding: 2.5rem 1.5rem;

  @media (min-width: 768px) {
    padding: 4rem 8rem;
  }
`;

export const title = css`
  font-size: 3rem;
  margin-top: 0;
`;
