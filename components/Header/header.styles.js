import { css } from '@emotion/react';

import boxShadow from '../../lib/styles/box-shadow';
import zIndex from '../../lib/styles/z-index';

export const header = css`
  ${boxShadow()}
  ${zIndex('header')}
  align-items: center;
  background-color: var(--color-yellow-bright);
  display: flex;
  flex-wrap: wrap;
  grid-area: header;
  justify-content: space-between;
  position: relative;
`;

export const logoContainer = css`
  font-size: 0;
  line-height: 0;
  margin-right: 1rem;
  overflow-y: hidden;
  padding-right: 0.6rem;

  @media (min-width: 768px) {
    margin-right: 1.5rem;
  }
`;

export const logoLink = css`
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: 2.1rem;

  @media (min-width: 768px) {
    font-size: 3.6rem;
  }
`;

export const logo = css`
  ${boxShadow()}

  height: 4.4rem;
  width: 4.4rem;

  @media (min-width: 768px) {
    height: 7rem;
    width: 7.1rem;
  }

  :hover > path,
  :focus > path {
    transform: rotate(-10deg);
    transform-origin: center center;
    transition: transform 200ms ease-in-out;
  }

  :hover > g,
  :focus > g {
    transform: rotate(10deg);
    transform-origin: center center;
    transition: transform 200ms ease-in-out;
  }
`;

export const burger = css`
  background: transparent;
  border: 0;
  cursor: pointer;
  margin-right: 1.5rem;
  margin-top: 0.25rem;
  outline: none;
  padding: 0;

  @media (min-width: 768px) {
    display: none;
  }
`;
