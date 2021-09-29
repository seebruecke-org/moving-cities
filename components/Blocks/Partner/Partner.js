import Columns from '@/components/Columns';
import Image from 'next/image';
import Markdown from '@/components/Markdown';

import { buildCMSUrl } from '@/lib/api';

export default function Partner({ partnerLogo, partnerContent }) {
  return (
    <Columns className="md:my-8 max-w-8xl pl-8 pr-8 md:pr-0 md:pl-10">
      <div />

      <div>
        <Markdown isSmall={false}>{partnerContent}</Markdown>

        <Image
            src={buildCMSUrl(partnerLogo.url)}
            layout="responsive"
            width={partnerLogo.width}
            height={partnerLogo.height}
            alt={partnerLogo.alternativeText}
            className="max-w-1/2"
          />
      </div>
    </Columns>
  );
}
