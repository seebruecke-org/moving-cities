import Columns from '@/components/Columns';
import Markdown from '@/components/Markdown';

export default function Section({ introContent: content }) {
  return (
    <Columns className="max-w-8xl">
      <span />

      <Markdown
        isSmall={true}
        classNames={{
          p: "text-xl md:text-2xl font-bold px-8 md:pr-0 leading-[1.2] lg:leading-tight"
        }}
      >
        {content}
      </Markdown>
    </Columns>
  );
}
