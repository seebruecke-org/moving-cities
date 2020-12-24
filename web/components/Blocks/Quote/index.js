export { default } from './Quote';

export const FRAGMENT = `
    ... on ComponentBlocksQuote {
        text
        author
    }
`;
