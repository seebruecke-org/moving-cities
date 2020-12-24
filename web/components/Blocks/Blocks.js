import Image from './Image';
import Quote from './Quote';
import Richtext from './Richtext';

export default function Blocks({ blocks = [] }) {
  const map = {
    ComponentBlocksRichtext: Richtext,
    ComponentBlocksQuote: Quote,
    ComponentBlocksImage: Image
  };

  return (
    <div>
      {blocks.map(({ __typename, ...block }) => {
        const BlockComponent = map[__typename] || null;

        if (!BlockComponent) {
          return null;
        }

        return <BlockComponent {...block} />;
      })}
    </div>
  );
}
