import Columns from '@/components/Columns';
import Heading from '@/components/Heading';
import Markdown from '@/components/Markdown';

export default function Section({ title, content }) {
  return (
    <Columns className="my-20 max-w-7xl pl-10">
      {title ? (
        <Heading level={2}>{title}</Heading>
      ) : <span />}

      <Markdown>{content}</Markdown>
    </Columns>
  );
}
