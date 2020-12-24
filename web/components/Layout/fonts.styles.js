import { css } from '@emotion/react';

import WhyteWoff from '../../public/fonts/Whyte/ABCWhyte-Regular.woff';
import WhyteWoff2 from '../../public/fonts/Whyte/ABCWhyte-Regular.woff2';

import WhyteMediumWoff from '../../public/fonts/Whyte/ABCWhyte-Medium.woff';
import WhyteMediumWoff2 from '../../public/fonts/Whyte/ABCWhyte-Medium.woff2';

const fonts = css`
  @font-face {
    font-family: 'Whyte';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(${WhyteWoff2}) format('woff2'), url(${WhyteWoff}) format('woff');
  }

  @font-face {
    font-family: 'Whyte';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url(${WhyteMediumWoff2}) format('woff2'), url(${WhyteMediumWoff}) format('woff');
  }
`;

export default fonts;
