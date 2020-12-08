import { css } from '@emotion/react';

import boxShadow from '../../lib/styles/box-shadow';
import zIndex from '../../lib/styles/z-index';

export const header = css`
  ${boxShadow()}
  ${zIndex('header')}
  align-items: center;
  background-color: var(--color-yellow);
  color: var(--color-blue);
  display: flex;
  grid-area: header;
  grid-column: 1 / -1;
  position: relative;
`;

export const logoContainer = css`
  font-size: 0;
  line-height: 0;
  margin-right: 1rem;
  overflow-y: hidden;
  padding-right: 0.6rem;
`

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
`;
