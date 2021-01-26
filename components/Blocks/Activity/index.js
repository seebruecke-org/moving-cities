export { default } from './Activity';

import { FRAGMENT as IMAGE_FRAGMENT } from '../Image';
import { FRAGMENT as QUOTE_FRAGMENT } from '../Quote';
import { FRAGMENT as RICHTEXT_FRAGMENT } from '../Richtext';

export const FRAGMENT = `
    ... on ComponentBlocksActivity {
        activity {
            content {
                __typename

                ${IMAGE_FRAGMENT}
                ${QUOTE_FRAGMENT}
                ${RICHTEXT_FRAGMENT}
            }
        }
    }
`;
