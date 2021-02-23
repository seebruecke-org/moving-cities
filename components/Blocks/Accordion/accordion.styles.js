import { css } from '@emotion/react';

export const accordion = css`
  margin-bottom: 3rem;
  margin-top: 3rem;

  @media (min-width: 768px) {
    margin-bottom: 6rem;
    margin-top: 6rem;
  }
`;

export const accordionItem = css`
  background-color: white;
  border: 1px solid black;
  border-radius: 2rem;
  margin-top: 1.5rem;
  overflow: hidden;

  @media (min-width: 768px) {
    border-radius: 2.5rem;
  }
`;

export const accordionButton = css`
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 1rem 1.25rem;

  @media (min-width: 768px) {
    font-size: 1.8rem;
  }

  :hover,
  :focus {
    background-color: var(--color-red);
  }
`;

export const accordionButtonIcon = css`
  flex-shrink: 0;
  height: auto;
  margin-right: 1rem;
  width: 2.4rem;

  @media (min-width: 768px) {
    margin-right: 1.5rem;
    width: 2.8rem;
  }
`

export const accordionPanel = css`
  padding: 0 1.5rem 1.5rem 6rem;
`;
