import { css } from '@emotion/react';

export const container = css`
  color: var(--color-blue);
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const label = css`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding-left: 1.5rem;
`

export const listContainer = css`
  flex: 1;
  position: relative;
`

export const list = css`
  height: 100%;
  list-style: none;
  left: 0;
  margin: 0;
  overflow-y: auto;
  padding: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

export const item = css`
  cursor: pointer;
  font-size: 2.4rem;
  padding: 0.5rem 1.5rem;

  :hover,
  :focus {
    background-color: var(--color-purple);
  }
`
