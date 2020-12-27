import { css } from '@emotion/react';

const global = (withSidebar) => css`
  display: grid;
  grid-template-areas:
    'header'
    ${withSidebar && "'sidebar'"}
    'main';
  grid-template-rows: min-content min-content ${withSidebar && '1fr'};
  height: 100vh;

  @media (min-width: 768px) {
    grid-template-areas:
      'header header'
      'main ${withSidebar ? 'sidebar' : 'main'}';
    grid-template-columns: 1fr ${withSidebar ? '30rem' : '1fr'};
    grid-template-rows: min-content 1fr;
  }
`;

export default global;
