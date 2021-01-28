import { css } from '@emotion/react';

export const container = css`
  background-color: var(--color-grey-light);
  overflow-y: auto;
  padding: 2.5rem 1.5rem;
  width: 100%;

  @media (min-width: 768px) {
    padding: 7rem 12rem;
  }
`;

export const title = css`
  font-size: 3rem;
  font-weight: 400;
  margin-top: 0;
`;

export const contentContainer = css`
  max-width: 65rem;
`;
