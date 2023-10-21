import Columns from '@/components/Columns';
import Markdown from '@/components/Markdown';

export default function Intro({ introContent: content, alignLeft }) {
  return alignLeft ? (
    <Markdown
      isSmall={true}
      classNames={{
        p: 'text-xl md:!text-2xl font-bold px-8 md:pr-0 leading-[1.2] lg:leading-tight !max-w-6xl md:pl-10'
      }}
    >
      {content}
    </Markdown>
  ) : (
    <Columns className="max-w-8xl">
      <span />

      <Markdown
        isSmall={true}
        classNames={{
          p: 'text-xl md:!text-2xl font-bold px-8 md:pr-0 leading-[1.2] lg:leading-tight'
        }}
      >
        {content}
      </Markdown>
    </Columns>
  );
}
