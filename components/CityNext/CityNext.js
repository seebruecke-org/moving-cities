import Link from 'next/link';

import Columns from '@/components/Columns';

export default function CityNext({ name, uri, subtitle }) {
  return (


      <Link href={uri}>
        <a className="flex flex-col bg-gradient-to-br from-red-300 to-pink-300 py-20 px-8 hover:from-black hover:to-black hover:text-white font-raptor text-s md:text-m font-medium">
        <Columns>
          <span />
          <div className="max-w-8xl">
            Next Featured City
            <span className="sr-only">:</span>
            <span className="text-2xl md:text-3xl font-bold block leading-none mt-4 md:mt-6">{name}</span>
            <span className="text-m md:text-xl font-bold leading-tight">{subtitle}</span>
          </div>
          </Columns>
        </a>
      </Link>

  );
}
