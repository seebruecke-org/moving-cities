import Columns from '@/components/Columns';
import Paragraph from '@/components/Paragraph';

export default function Section({ introContent: content }) {
  return (
    <Columns className="max-w-8xl">
      <span />

      <Paragraph isSmall={true} className="text-xl md:text-2xl font-bold px-8 md:pr-0 leading-[1.2] lg:leading-tight">
        {content}
      </Paragraph>
    </Columns>
  );
}
