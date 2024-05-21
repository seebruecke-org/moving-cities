import Columns from '@/components/Columns';
import Heading from '@/components/Heading';
import Collapsible from '@/components/Blocks/MultiCollapsible/Collapsible';

export default function Section({ heading, collapsibles = [], children }) {
  return (
    <Columns className="mt-10 mb-6 md:my-8 max-w-8xl pl-8 pr-8 md:pr-0 md:pl-10">
      {heading ? (
        <Heading level={2} className="mb-8 lg:mb-0 [word-break:break-word]">
          {heading}
        </Heading>
      ) : (
        <span />
      )}

      <div>
        {collapsibles?.map((collapsible, cI) => (
          <Collapsible key={cI} {...collapsible} />
        ))}
      </div>

      {children}
    </Columns>
  );
}
