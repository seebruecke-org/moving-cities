import { css } from '@emotion/react';

export const list = css`
  background-color: var(--color-yellow-bright);
  height: 100%;
  list-style: none;
  margin-bottom: 0;
  margin-top: 0;
  overflow-y: auto;
  padding-left: 0;
  position: relative;
  width: 100%;
`;

export const item = css`
  align-items: center;
  border-bottom: 1px solid var(--color-yellow-dark);
  color: var(--color-blue);
  display: flex;
  font-size: 2.4rem;
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

export const cityName = css`
  font-size: 2.2rem;
  justify-self: flex-end;
  margin-left: auto;
  margin-right: 1.25rem;
`
