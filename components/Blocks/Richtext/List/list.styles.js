import { css } from '@emotion/react';

export const list = css`
  list-style: none;
  padding-left: 0;

  > * + * {
    margin-top: 1.5rem;
  }

  @media (min-width: 768px) {
    > * + * {
      margin-top: 2rem;
    }
  }
`;
