import { css } from '@emotion/react';

import boxShadow from '../../lib/styles/box-shadow';

export const accordion = css`
  margin: 8rem -1.5rem 0 -1.5rem;

  @media (min-width: 768px) {
    margin-left: -9rem;
    margin-right: -9rem;
  }
`;

export const accordionButton = css`
  ${boxShadow()}

  align-items: center;
  background: white;
  border-radius: 1rem 0 0 0;
  cursor: pointer;
  display: flex;
  font-size: 2.1rem;
  padding: 1rem 1.5rem 2.25rem 1.5rem;

  @media (min-width: 768px) {
    font-size: 3rem;
  }

  :hover,
  :focus {
    background-color: var(--color-yellow-bright);
  }
`;

export const accordionButtonIcon = css`
  @media (max-width: 768px) {
    height: 2.5rem;
    justify-self: flex-end;
    margin-left: auto;
    order: 2;
    width: 2.5rem;
  }

  @media (min-width: 768px) {
    height: 3.2rem;
    margin-left: 1.5rem;
    margin-right: 2.5rem;
    width: 3.2rem;
  }
`;

export const accordionItem = css`
  margin-top: -1rem;
`;

export const accordionPanel = css`
  max-width: 67rem;
  padding: 1rem 1.5rem 1.5rem 1.5rem;

  @media (min-width: 768px) {
    padding: 2rem 0 2rem 9rem;
  }
`;
