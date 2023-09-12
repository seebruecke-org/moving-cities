import Columns from '@/components/Columns';
import Heading from '@/components/Heading';
import Image from 'next/image';

import { buildCMSUrl } from '@/lib/api';

export default function LogoGrid({ logoGridTitle, logoGridItems }) {
  const logos = logoGridItems.filter(({ logo }) => !!logo?.url);

  const renderImage = (logo) => {
    const { url, width, height, alternativeText } = logo;
    return (
      <Image
        src={buildCMSUrl(url)}
        layout="intrinsic"
        width={width}
        height={height}
        alt={alternativeText}
      />
    );
  };

  return (
    <Columns className="py-8 md:py-20 max-w-8xl pl-8 pr-8 md:pr-0 md:pl-10">
      <div>{logoGridTitle && <Heading level={2}>{logoGridTitle}</Heading>}</div>

      <ul className="grid grid-cols-2 md:grid-cols-3 gap-y-16 gap-x-8 md:gap-x-16">
        {logos.map(({ logo, url }) => (
          <li className="flex items-center justify-center">
            {!!url ? (
              <a href={url} target="_blank" rel="noopener noreferrer">
                {renderImage(logo)}
              </a>
            ) : (
              renderImage(logo)
            )}
          </li>
        ))}
      </ul>
    </Columns>
  );
}
