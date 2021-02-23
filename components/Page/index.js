export { default } from './Page';

import { BLOCK_FRAGMENTS } from '../Blocks';
import { FRAGMENT as ACCORDION_FRAGMENT } from '../Blocks/Accordion';

export const FRAGMENT = `
    title
    content {
        ${BLOCK_FRAGMENTS}
        ${ACCORDION_FRAGMENT}
    }
`;
