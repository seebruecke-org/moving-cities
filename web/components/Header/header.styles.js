import { css } from '@emotion/react';

export const header = css`
  align-items: center;
  background-color: var(--color-yellow);
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.2);
  color: var(--color-blue);
  display: flex;
  grid-area: header;
  grid-column: 1 / span 13;
  position: relative;
`;

export const logoContainer = css`
  font-size: 0;
  line-height: 0;
  margin-right: 1rem;
  overflow-y: hidden;
  padding-right: 0.6rem;
`

export const logo = css`
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.2);
`;
