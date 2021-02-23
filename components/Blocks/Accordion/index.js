export { default } from './Accordion';

export const FRAGMENT = `
    ... on ComponentBlocksAccordion {
      items: Item {
        title
        content
      }
    }
`;
