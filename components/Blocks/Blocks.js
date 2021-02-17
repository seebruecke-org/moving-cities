import Accordion from './Accordion';
import Activity from './Activity';
import Image from './Image';
import Quote from './Quote';
import Richtext from './Richtext';

export default function Blocks({ blocks = [] }) {
  const map = {
    ComponentBlocksAccordion: Accordion,
    ComponentBlocksActivity: Activity,
    ComponentBlocksRichtext: Richtext,
    ComponentBlocksQuote: Quote,
    ComponentBlocksImage: Image
  };

  return (
    <div>
      {blocks.map(({ __typename, ...block }, index) => {
        const BlockComponent = map[__typename] || null;
        const key = `block-${__typename}-${index}`;

        if (!BlockComponent) {
          return null;
        }

        return <BlockComponent key={key} {...block} />;
      })}
    </div>
  );
}
