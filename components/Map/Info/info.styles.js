import { css } from '@emotion/react';

import boxShadow from '../../../lib/styles/box-shadow';

export const button = css`
  ${boxShadow()}

  background: white;
  border: 0;
  border-radius: 50%;
  font-family: var(--font-sans);
  font-size: 1.5rem;
  font-weight: 500;
  height: 2.75rem;
  margin-bottom: 1.5rem;
  width: 2.75rem;

  @media (min-width: 768px) {
    height: 3.25rem;
    width: 3.25rem;
  }

  :hover,
  :focus {
    background-color: var(--color-red);
    color: white;
  }
`;

export const text = css`
  position: relative;
  top: 0.1rem;
`;
