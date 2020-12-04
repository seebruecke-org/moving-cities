import { css } from '@emotion/react';

export const sidebar = css`
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.2);
  grid-area: sidebar;
  grid-column: 1 / span 12;

  @media (min-width: 768px) {
    grid-column: auto;
  }
`;
