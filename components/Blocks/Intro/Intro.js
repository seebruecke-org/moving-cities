import Columns from '@/components/Columns';
import Paragraph from '@/components/Paragraph';

export default function Section({ introContent: content }) {
  return (
    <Columns className="max-w-7xl">
      <span />

      <Paragraph className="text-4xl font-bold pl-8">{content}</Paragraph>
    </Columns>
  );
}
