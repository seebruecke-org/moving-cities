import Columns from '@/components/Columns';
import Heading from '@/components/Heading';
import Markdown from '@/components/Markdown';

export default function Section({ title, content }) {
  return (
    <Columns>
      <Heading level={2}>{title}</Heading>

      <Markdown>{content}</Markdown>
    </Columns>
  );
}
