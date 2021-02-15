import { css } from '@emotion/react';

export const container = css`
  align-items: center;
  display: flex;
  min-height: 2.6rem;
  padding-left: 4.5rem;
  position: relative;
`;

export const input = css`
  height: 2.6rem;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 2.6rem;

  :checked ~ span::after {
    opacity: 1;
  }
`;

export const checkbox = css`
  cursor: pointer;
  pointer-events: none;

  :hover:before,
  :focus:before {
    box-shadow: 0 0 0.2rem currentColor;
  }

  ::before {
    background-color: white;
    border: 0.2rem solid currentColor;
    border-radius: 0.4rem;
    content: '';
    height: 2.6rem;
    left: 0;
    position: absolute;
    top: 0;
    width: 2.6rem;
  }

  ::after {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 15' fill='none'><path stroke='currentColor' strokeWidth='2' d='M1 1l14 14m0-14L1 15'/></svg>");
    background-size: 100% 100%;
    content: '';
    height: 1.6rem;
    left: 0.55rem;
    opacity: 0;
    position: absolute;
    top: 0.45rem;
    width: 1.6rem;
  }
`;
