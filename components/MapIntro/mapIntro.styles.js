import { indexes } from '../../lib/styles/z-index';
import { css } from '@emotion/react';

export const close = css`
  align-self: flex-end;
  background: transparent;
  border: 0;
  display: block;
  height: auto;
  padding: 1rem;

  @media (min-width: 768px) {
    position: fixed;
    right: 2rem;
    top: 2rem;
    width: 2.5rem;
  }
`;

export const cta = css`
  align-self: flex-start;
  align-items: center;
  background: transparent;
  border: 0;
  color: white;
  display: flex;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  padding: 0;

  @media (min-width: 768px) {
    align-self: center;
  }
`;

export const content = {
  backgroundColor: 'var(--color-red)',
  border: 0,
  borderRadius: '2rem',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'var(--font-sans)',
  fontSize: '2.1rem',
  fontWeight: '500'
};

export const overlay = {
  alignItems: 'center',
  backgroundColor: 'rgba(27, 27, 27, 0.82)',
  display: 'flex',
  justifyContent: 'center',
  zIndex: indexes.overlay
};
