import { indexes } from '../../lib/styles/z-index';
import { css } from '@emotion/react';

export const close = css`
  align-self: flex-end;
  background: transparent;
  border: 0;
  color: white;
  display: block;
  height: auto;
  padding: 1rem;

  @media (min-width: 768px) {
    position: fixed;
    right: 4rem;
    top: 2rem;
    width: 2.5rem;
  }

  :hover,
  :focus {
    color: black;
    cursor: pointer;
  }
`;

export const cta = css`
  align-self: flex-start;
  align-items: center;
  background: transparent;
  border: 0;
  color: white;
  cursor: pointer;
  display: flex;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  padding: 0;

  @media (min-width: 768px) {
    align-self: center;
  }

  :hover,
  :focus {
    text-decoration: underline;
    text-decoration-thickness: 0.25rem;
    text-underline-offset: 0.35rem;
  }

  :hover > svg,
  :focus > svg {
    animation: none;
  }
`;

export const ctaIcon = css`
  @keyframes bounce {
    0% {
      transform: translateX(0);
    }

    10% {
      transform: translateX(1rem);
    }

    100% {
      transform: translateX(0);
    }
  }

  animation-delay: 500ms;
  animation-duration: 1500ms;
  animation-iteration-count: infinite;
  animation-name: bounce;
  margin-left: 1.5rem;
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
  fontWeight: '500',
  justifyContent: 'center'
};

export const overlay = {
  alignItems: 'center',
  backgroundColor: 'rgba(27, 27, 27, 0.82)',
  display: 'flex',
  justifyContent: 'center',
  zIndex: indexes.overlay
};
