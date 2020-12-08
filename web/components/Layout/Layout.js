import { css, Global } from '@emotion/react';

import Header from '../Header';

import * as variables from './variables.styles';
import fonts from './fonts.styles';
import grid from './grid.styles';
import reset from './reset.styles';

const Layout = ({ children }) => {
  return <div css={grid}>
    <Global styles={[reset, variables.colors, fonts]} />

    <Header />

    {children}
  </div>
};

export default Layout;
