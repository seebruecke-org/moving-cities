import { css } from '@emotion/react';

export const list = css`
  background-color: var(--color-yellow-bright);
  height: 100%;
  list-style: none;
  margin-bottom: 0;
  margin-top: 0;
  padding-left: 0;
`;

export const item = css`
  border-bottom: 1px solid var(--color-yellow-dark);
  color: var(--color-blue);
  font-size: 3.3rem;
`;

export const link = css`
  cursor: pointer;
  display: block;
  padding: 1.25rem 1.5rem;

  :hover,
  :focus {
    background-color: var(--color-yellow-dark);
  }
`;

export const linkContent = css`
  display: block;
  max-width: 80rem;
`;
