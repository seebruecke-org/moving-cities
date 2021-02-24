import { css } from '@emotion/react';

export const container = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  position: relative;
  width: 100%;
`;

export const innerContainer = css`
  height: 100%;

  left: 0;
  margin: 0;
  overflow-y: auto;
  position: absolute;
  top: 0;
  width: 100%;
`;

export const label = css`
  font-size: 1.4rem;
  font-weight: 400;
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding-left: 1.5rem;
`;

export const list = css`
  list-style: none;
  padding: 0;

  @media (max-width: 768px) {
    margin-top: 5rem;
  }
`;
