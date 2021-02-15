import { css } from '@emotion/react';

export const list = css`
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
  border-bottom: 1px solid var(--color-grey-medium);
  display: flex;
  font-size: 2.4rem;
`;

export const link = css`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.5rem;
  width: 100%;

  @media (min-width: 768px) {
    align-items: center;
    flex-direction: row;
  }

  :hover,
  :focus {
    background-color: var(--color-red);
  }
`;

export const linkContent = css`
  display: block;
  line-height: 1.2;
  max-width: 80rem;
`;

export const cityName = css`
  font-size: 1.3rem;
  order: -1;

  @media (min-width: 768px) {
    justify-self: flex-end;
    margin-left: auto;
    margin-right: 4rem;
    order: inherit;
  }
`;
