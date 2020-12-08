import { css } from '@emotion/react';

const styles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    height: 100%;
  }

  body {
    font-family: var(--font-sans);
    margin: 0;
    min-height: 100%;
    overflow: hidden;
  }

  a {
    color: currentColor;
    text-decoration: none;
  }
`;

export default styles;
