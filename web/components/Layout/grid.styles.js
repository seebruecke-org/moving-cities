import { css } from '@emotion/react';

const global = css`
  display: grid;
  grid-template-areas:
    'header'
    'sidebar'
    'main';
  grid-template-rows: min-content min-content 1fr;
  height: 100vh;

  @media (min-width: 768px) {
    grid-template-areas:
      'header header'
      'main sidebar';
    grid-template-columns: 1fr 30rem;
    grid-template-rows: min-content 1fr;
  }
`;

export default global;
