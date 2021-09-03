import Link from 'next/link';

import Columns from '@/components/Columns';

export default function CityNext({ name, slug, subtitle }) {
  return (
      <Link href={`/${slug}`}>
        <a className="flex flex-col bg-gradient-to-br from-red-300 to-pink-300 py-20 px-8 hover:from-black hover:to-black hover:text-white font-raptor text-s md:text-m font-medium">
        <Columns>
          <span />
          <div className="flex justify-between items-center max-w-8xl w-full">
            <div className="mr-20">
              Next Featured City
              <span className="sr-only">:</span>
              <span className="text-2xl md:text-3xl font-bold block leading-none mt-4 md:mt-6">{name}</span>
              <span className="text-m md:text-xl font-bold leading-tight">{subtitle}</span>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 47" width="21" height="47" fill="none" viewBox="0 0 21 47" className="w-5 md:w-8 h-auto">
              <path fill="currentColor" fill-rule="evenodd" d="M0 2.15c0 .56.2 1.1.53 1.5L16.7 23.51.53 43.36c-.17.2-.3.44-.4.7a2.5 2.5 0 00.2 2.03c.2.35.5.61.83.77.33.15.7.18 1.05.09.35-.1.66-.31.91-.62l17.37-21.34c.33-.4.51-.93.51-1.48 0-.56-.18-1.1-.5-1.49L3.11.68A1.76 1.76 0 002.2.05c-.35-.1-.72-.06-1.06.1A1.9 1.9 0 00.3.94c-.2.35-.31.78-.31 1.2z" clip-rule="evenodd"/>
            </svg>
          </div>
          </Columns>
        </a>
      </Link>
  );
}
