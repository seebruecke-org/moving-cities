import { FRAGMENT as ACCORDION_FRAGMENT } from './Accordion';
import { FRAGMENT as IMAGE_FRAGMENT } from './Image';
import { FRAGMENT as QUOTE_FRAGMENT } from './Quote';
import { FRAGMENT as RICHTEXT_FRAGMENT } from './Richtext';

export { default } from './Blocks';

export const BLOCK_FRAGMENTS = `
    __typename

    ${ACCORDION_FRAGMENT}
    ${RICHTEXT_FRAGMENT}
    ${QUOTE_FRAGMENT}
    ${IMAGE_FRAGMENT}
`;
