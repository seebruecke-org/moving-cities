import Context from '@/components/Blocks/Context';
import Intro from '@/components/Blocks/Intro';
import Quote from '@/components/Blocks/Quote';
import Richtext from '@/components/Blocks/Richtext';
import Section from '@/components/Blocks/Section';

const BLOCKS = {
  Context,
  Intro,
  Quote,
  Richtext,
  Section
};

export default function BlockSwitch({ blocks = [] }) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col">
      {blocks.map(({ __typename, ...block }) => {
        const Component = BLOCKS?.[__typename] ?? null;

        return <Component {...block} />;
      })}
    </div>
  );
}
