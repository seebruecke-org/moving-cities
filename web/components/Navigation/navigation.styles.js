import { css } from '@emotion/react';

export const navigation = css`
  color: var(--color-blue);
  display: grid;
  flex-direction: column;
  overflow-x: hidden;
  padding-bottom: 0.8rem;
`;

export const inner = css`
  display: flex;
  padding: 1rem;

  @media (min-width: 768px) {
    box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.2);
    flex-direction: column;
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
  display: flex;
  font-size: 1rem;
  position: relative;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }

  ::before {
    background-color: currentColor;
    border-radius: 50%;
    content: '';
    display: inline-block;
    height: 2rem;
    margin-right: 0.5rem;
    width: 2rem;
  }

  ::after {
    background-color: white;
    border: 0.15rem solid white;
    border-radius: 50%;
    content: '';
    display: block;
    height: 1.7rem;
    left: 0.15rem;
    position: absolute;
    top: 0.15rem;
    width: 1.7rem;
  }
`;

export const itemActive = css`
  ::after {
    background-color: var(--color-green);
  }
`
