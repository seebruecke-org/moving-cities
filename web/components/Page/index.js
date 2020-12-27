export { default } from './Page';

import { BLOCK_FRAGMENTS } from '../Blocks';

export const FRAGMENT = `
    title
    content {
        ${BLOCK_FRAGMENTS}
    }
`;
