import { css } from '@emotion/react';

import boxShadow from '../../lib/styles/box-shadow';

export const accordion = css`
  margin: 8rem -4rem 0 -4rem;
`;

export const accordionButton = css`
  ${boxShadow()}

  align-items: center;
  background: white;
  border-radius: 1rem 0 0 0;
  cursor: pointer;
  display: flex;
  font-size: 3rem;
  padding: 1rem 1rem 2rem 4rem;

  :hover,
  :focus {
    background-color: var(--color-purple);
  }
`;

export const accordionButtonIcon = css`
  margin-right: 1rem;
`;

export const accordionItem = css`
  margin-top: -1rem;
`;

export const accordionPanel = css`
  max-width: 67rem;
  padding: 2rem 0 2rem 4rem;
`;
