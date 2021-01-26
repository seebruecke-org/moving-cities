export { default } from './Image';

export const FRAGMENT = `
    ... on ComponentBlocksImage {
        media {
            alternativeText
            url
            width
            height
        }
        caption
    }
`;
