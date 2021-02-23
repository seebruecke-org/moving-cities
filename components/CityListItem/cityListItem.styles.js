import { css } from '@emotion/react';

export const container = css`
  position: relative;
`;

export const name = css`
  cursor: pointer;
  display: block;
  font-size: 2.4rem;
  line-height: 1.2;
  padding: 0.75rem 1.5rem;
  width: 100%;

  :hover,
  :focus {
    background-color: var(--color-red);
  }
`;

export const active = css`
  background-color: var(--color-red);
`;

export const close = css`
  align-items: center;
  background: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  height: 100%;
  padding: 0 1rem;
  position: absolute;
  right: 0;
  top: 0;

  :hover,
  :focus {
    background: white;
  }
`;
