import instagramLogo from '@/public/images/instagram.svg';
import SocialLink from '@/components/Menu/Overlay/SocialLink';
import twitterLogo from '@/public/images/twitter.svg';
import Link from 'next/link';

export default function Footer({ instagram_url, x_url, main_items, secondary_items }) {
  return (
    <footer className="px-8 py-6 font-raptor font-bold text-white text-s flex flex-col lg:flex-row bg-gradient-to-bl from-red-300 to-pink-300 lg:items-center">
      <div className="mb-4 lg:order-2 lg:mb-0 lg:ml-8 flex">
        <SocialLink url={instagram_url} logo={instagramLogo} />
        <SocialLink url={x_url} logo={twitterLogo} />
      </div>
      <div className="flex flex-col lg:flex-row lg:order-1 lg:gap-x-4">
        {main_items
          ?.filter((i) => i.page?.slug && i.title)
          ?.map((item, iI) => (
            <Link href={`/page/${item.page.slug}`} key={iI}>
              <a className="hover:text-black">{item.title}</a>
            </Link>
          ))}
      </div>
      <div className="flex flex-col lg:flex-row lg:ml-auto lg:order-3 lg:gap-x-4">
        {secondary_items
          ?.filter((i) => i.page?.slug && i.title)
          ?.map((item, iI) => (
            <Link href={`/page/${item.page.slug}`} key={iI}>
              <a className="hover:text-black">{item.title}</a>
            </Link>
          ))}
      </div>
    </footer>
  );
}
