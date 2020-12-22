import { css } from '@emotion/react';

export const container = css`
  align-items: center;
  display: none;

  @media (min-width: 768px) {
    display: flex;
  }

  > * + * {
    margin-left: 1.5rem;
  }
`;

export const containerIsOpen = css`
  display: flex;
`

export const about = css`
  background: white;
  border: 0.1px solid currentColor;
  border-radius: 2.4rem;
  cursor: pointer;
  display: block;
  font-size: 2.4rem;
  padding: 0.15rem 1.25rem;

  :hover,
  :focus {
    background-color: var(--color-blue);
    color: white;
  }
`;

export const item = css`
  cursor: pointer;
  font-size: 1.3rem;

  :hover,
  :focus {
    text-decoration: underline;
  }
`
