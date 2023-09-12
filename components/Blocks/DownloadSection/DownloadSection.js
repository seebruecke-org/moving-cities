import Columns from '@/components/Columns';
import Heading from '@/components/Heading';
import Markdown from '@/components/Markdown';
import Button from '@/components/Button';
import { buildCMSUrl } from '@/lib/api';

export default function DownloadSection({
  title,
  downloadSectionContent = {},
  downloadSectionFiles = [],
  children
}) {
  const { content } = downloadSectionContent || {};
  const files = downloadSectionFiles?.map((dsf) => dsf.file) || {};

  return (
    <Columns className="mt-10 mb-6 md:my-8 max-w-8xl pl-8 pr-8 md:pr-0 md:pl-10">
      {title ? (
        <Heading level={2} className="mb-8 md:mb-0 [word-break:break-word]">
          {title}
        </Heading>
      ) : (
        <span />
      )}

      <div>
        {content && <Markdown isSmall={false}>{content}</Markdown>}

        {files?.map((file, fI) => (
          <div className="mt-16">
            <Button
              href={buildCMSUrl(file.url)}
              className="w-auto self-start"
              key={fI}
              priority
              target="_blank"
              rel="noopener norefferer"
            >
              {file.name}
              <span class="text-red-300 ml-4">⤓</span>
            </Button>
          </div>
        ))}
      </div>

      {children}
    </Columns>
  );
}
