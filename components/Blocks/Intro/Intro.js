import Columns from '@/components/Columns';
import Paragraph from '@/components/Paragraph';

export default function Section({ introContent: content }) {
  return (
    <Columns className="max-w-8xl">
      <span />

      <Paragraph className="text-l md:text-3xl font-bold pl-8 leading-tight">{content}</Paragraph>
    </Columns>
  );
}
