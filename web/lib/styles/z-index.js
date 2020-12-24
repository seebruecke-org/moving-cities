import { css } from '@emotion/react';

const indexes = {
  background: 1,
  sidebarFront: 30,
  sidebarBack: 20,
  header: 40,
  mapOverlay: 15,
  overlay: 50
};

export default (size) => css`
  z-index: ${indexes[size]};
`;
