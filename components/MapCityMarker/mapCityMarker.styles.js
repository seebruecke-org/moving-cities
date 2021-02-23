import { css } from '@emotion/react';

const ICON_BASE = css`
  cursor: pointer;
`;

export const container = css`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const icon = css`
  ${ICON_BASE}
  height: 0.75rem;
  width: 0.75rem;
`;

export const profileIcon = css`
  ${ICON_BASE}
  height: 2.75rem;
  width: 2.75rem;
`;

export const name = css`
  font-family: var(--font-sans);
  font-size: 1.1rem;
  line-height: 1;
  max-width: 9rem;
  text-align: center;
`;
