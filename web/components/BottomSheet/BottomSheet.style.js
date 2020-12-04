import { css } from '@emotion/react';

export const container =  css`
  background-color: white;
  position: absolute;
  top: calc(100% - 2rem);
  width: 100%;

  @media (min-width: 768px) {
    position: static;
  }
`;

export const handle = css`
  border-top: 0.25rem solid var(--color-blue);
  height: 0.1rem;
  left: 50%;
  position: absolute;
  top: 1rem;
  transform: translateX(-50%);
  width: 50%;

  @media (min-width: 768px) {
    display: none;
  }
`;
