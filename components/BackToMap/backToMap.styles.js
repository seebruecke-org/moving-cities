import { css } from '@emotion/react';

export const link = css`
  display: none;
  font-size: 1.75rem;
  left: -3.25rem;
  position: absolute;
  top: 50%;
  transform: rotate(-90deg);

  @media (min-width: 768px) {
    display: block;
  }

  :hover,
  :focus {
    text-decoration: underline;
  }
`;
