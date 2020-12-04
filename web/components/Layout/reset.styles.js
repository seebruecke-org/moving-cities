import { css } from '@emotion/react';

const styles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    height: 100%;
    margin: 0;
    overflow: hidden;
  }

  a {
    color: currentColor;
    text-decoration: none;
  }
`;

export default styles;
