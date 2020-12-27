import { css } from '@emotion/react';

import boxShadow from '../../lib/styles/box-shadow';

export const accordion = css`
  margin: 8rem -1.5rem 0 -1.5rem;

  @media (min-width: 768px) {
    margin-left: -4rem;
    margin-right: -4rem;
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
  padding: 1rem 1.5rem 1.5rem 1.5rem;

  @media (min-width: 768px) {
    font-size: 3rem;
    padding-bottom: 2rem;
  }

  :hover,
  :focus {
    background-color: var(--color-purple);
  }
`;

export const accordionButtonIcon = css`
  @media (max-width: 768px) {
    justify-self: flex-end;
    margin-left: auto;
    order: 2;
  }

  @media (min-width: 768px) {
    margin-right: 1rem;
  }
`;

export const accordionItem = css`
  margin-top: -1rem;
`;

export const accordionPanel = css`
  max-width: 67rem;
  padding: 1rem 1.5rem 1.5rem 1.5rem;

  @media (min-width: 768px) {
    padding: 2rem 0 2rem 4rem;
  }
`;
