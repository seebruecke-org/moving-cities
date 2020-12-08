import { css } from '@emotion/react';

import WhyteWoff from '../../public/fonts/Whyte/ABCWhyte-Regular.woff';
import WhyteWoff2 from '../../public/fonts/Whyte/ABCWhyte-Regular.woff2';

const fonts = css`
  @font-face {
    font-family: 'Whyte';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(${WhyteWoff2}) format('woff2'),
      url(${WhyteWoff}) format('woff');
  }
`;

export default fonts;
