import { css } from '@emotion/react';

export const container = css`
  color: var(--color-blue);
`

export const label = css`
  font-size: 0.9rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding-left: 1.5rem;
`

export const list = css`
  list-style: none;
  margin: 0;
  max-height: 100%;
  overflow-y: auto;
  padding: 0;
`;

export const item = css`
  cursor: pointer;
  padding: 0.5rem 1.5rem;

  :hover,
  :focus {
    background-color: var(--color-green);
  }
`
