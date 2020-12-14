import { css } from '@emotion/react';

import boxShadow from '../../lib/styles/box-shadow';

export const navigation = css`
  color: var(--color-blue);
  display: grid;
  flex-direction: column;

  @media (min-width: 768px) {
    padding-bottom: 0.8rem;
  }
`;

export const inner = css`
  display: flex;
  justify-content: center;
  padding: 1rem;

  @media (min-width: 768px) {
    ${boxShadow()}

    flex-direction: column;
    justify-content: auto;
    padding: 1.5rem;
  }

  > * + * {
    margin-left: 0.5rem;

    @media (min-width: 768px) {
      margin-left: 0;
      margin-top: 0.75rem;
    }
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

  :hover::after,
  :focus::after {
    background-color: var(--color-theme);
  }

  ::before {
    background-color: currentColor;
    border-radius: 50%;
    content: '';
    display: inline-block;
    height: 2.3rem;
    margin-right: 0.5rem;
    width: 2.3rem;

    @media (min-width: 768px) {
      height: 3.3rem;
      width: 3.3rem;
    }
  }

  ::after {
    background-color: white;
    border: 0.15rem solid white;
    border-radius: 50%;
    content: '';
    display: block;
    height: 2rem;
    left: 0.15rem;
    position: absolute;
    top: 0.25rem;
    width: 2rem;

    @media (min-width: 768px) {
      height: 3rem;
      left: 0.15rem;
      top: 0.65rem;
      width: 3rem;
    }
  }
`;

export const itemActive = css`
  ::after {
    background-color: var(--color-theme);
  }
`
