import Columns from '@/components/Columns';
import Image from 'next/image';

import { buildCMSUrl } from '@/lib/api';

export default function LogoGrid({ logoGridItems }) {
  return (
    <Columns className="py-8 md:py-20 px-8 md:px-0">
      <span />

      <ul className="grid grid-cols-2 md:grid-cols-3 gap-y-16 gap-x-8 md:gap-x-16">
        {logoGridItems.map(({ logo: { url, width, height, alternativeText } }) => (
          <li className="flex items-center justify-center">
              <Image
                src={buildCMSUrl(url)}
                layout="intrinsic"
                width={width}
                height={height}
                alt={alternativeText}
              />
          </li>
        ))}
      </ul>
    </Columns>
  );
}
