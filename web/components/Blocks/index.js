export { default } from './Blocks';

import { FRAGMENT as IMAGE_FRAGMENT } from './Image';
import { FRAGMENT as QUOTE_FRAGMENT } from './Quote';
import { FRAGMENT as RICHTEXT_FRAGMENT } from './Richtext';

export const BLOCK_FRAGMENTS = `
    __typename

    ${RICHTEXT_FRAGMENT}
    ${QUOTE_FRAGMENT}
    ${IMAGE_FRAGMENT}
`;
