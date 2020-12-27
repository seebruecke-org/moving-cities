import { css } from '@emotion/react';

import boxShadow from '../../lib/styles/box-shadow';

export const container = css`
  align-items: center;
  display: none;
  overflow-y: hidden;
  position: relative;

  @media (max-width: 768px) {
    justify-content: space-between;
    padding: 2.5rem 1.5rem 1.5rem 1.5rem;
    width: 100%;
  }

  @media (min-width: 768px) {
    display: flex;
    margin-right: 1.5rem;
  }

  @media (max-width: 768px) {
    ::before {
      ${boxShadow()}

      content: '';
      height: 0.8rem;
      left: 0;
      position: absolute;
      top: -0.8rem;
      width: 100%;
    }
  }

  > * + * {
    margin-left: 1.5rem;
  }
`;

export const containerIsOpen = css`
  display: flex;
`;

export const about = css`
  background: white;
  border: 0.1px solid currentColor;
  border-radius: 2.4rem;
  cursor: pointer;
  display: block;
  font-size: 2.4rem;
  line-height: 1;
  padding: 0.35rem 1.25rem;

  :hover,
  :focus {
    background-color: var(--color-blue);
    color: white;
  }
`;

export const pagesContainer = css`
  display: flex;

  > * + * {
    margin-left: 1.5rem;
  }
`;

export const item = css`
  cursor: pointer;
  font-size: 1.3rem;

  :hover,
  :focus {
    text-decoration: underline;
  }
`;
