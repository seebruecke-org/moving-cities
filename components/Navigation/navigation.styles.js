import { css } from '@emotion/react';

import boxShadow from '../../lib/styles/box-shadow';
import zIndex from '../../lib/styles/z-index';

export const navigation = css`
  ${zIndex('header')}

  background-color: white;
  display: grid;
  flex-direction: column;

  @media (min-width: 768px) {
    overflow-x: hidden;
    padding-bottom: 0.8rem;
  }
`;

export const inner = css`
  display: flex;
  justify-content: center;
  padding: 1rem;

  @media (max-width: 768px) {
    justify-content: space-around;
    padding-bottom: 1.15rem;
    padding-top: 1.15rem;
  }

  @media (min-width: 768px) {
    ${boxShadow()}

    flex-direction: column;
    justify-content: auto;
    padding: 1.5rem;
  }

  > * + * {
    @media (min-width: 768px) {
      margin-top: 0.75rem;
    }
  }
`;

export const icon = css`
  height: 2.25rem;
  margin-right: 0.5rem;
  width: 2.25rem;

  @media (min-width: 500px) {
    margin-right: 1.5rem;
  }

  @media (min-width: 768px) {
    height: 3.4rem;
    margin-right: 1rem;
    width: 3.4rem;
  }
`;

export const iconActive = css`
  > circle:nth-child(2) {
    fill: var(--color-red);
  }
`;

export const item = css`
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: 1.7rem;
  position: relative;

  @media (min-width: 768px) {
    font-size: 3rem;
  }

  :hover > svg > circle:nth-child(2),
  :focus > svg > circle:nth-child(2) {
    fill: var(--color-red);
  }
`;

export const itemActive = css`
  ::after {
    background-color: var(--color-red);
  }
`;
