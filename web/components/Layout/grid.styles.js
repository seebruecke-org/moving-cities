import { css } from '@emotion/react';

const global = css`
  display: grid;
  grid-template-areas:
    "header"
    "sidebar"
    "main";
  height: 100vh;

  @media (min-width: 768px) {
    grid-template-areas:
    "header . . . . . . . . . . . ."
    "main main main main main main main main main main main sidebar sidebar";
    grid-template-rows: min-content
      1fr;
  }
`;

export default global;
