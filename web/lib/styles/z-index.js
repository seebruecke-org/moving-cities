import { css } from '@emotion/react';

const indexes = {
  background: 1,
  sidebarFront: 2,
  sidebarBack: 3,
  header: 4,
  overlay: 5,
};

export default (size) => css`
  z-index: ${indexes[size]};
`;
