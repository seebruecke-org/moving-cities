import { css } from '@emotion/react';

const global = css`
  display: grid;
  grid-auto-rows: min-content;
  grid-template-areas:
    "header"
    "sidebar"
    "main";

  @media (min-width: 768px) {
    grid-template-areas:
    "header . . . . . . . . . . . ."
    "main main main main main main main main main main main sidebar sidebar";
  }
`;

export default global;
