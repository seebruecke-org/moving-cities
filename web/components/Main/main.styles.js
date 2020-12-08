import { css } from '@emotion/react';

export const container = css`
  grid-area: main;

  @media (max-width: 768px) {
    grid-column: 1 / span 12;
  }
`;
