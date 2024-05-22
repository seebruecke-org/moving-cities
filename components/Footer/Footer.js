import instagramLogo from '@/public/images/instagram.svg';
import twitterLogo from '@/public/images/twitter.svg';
import Link from 'next/link';
import SocialLink from '@/components/Footer/SocialLink';
import { useTranslation } from 'next-i18next';

export default function Footer({ instagram_url, x_url, main_items, secondary_items }) {
  const { t: tSlugs } = useTranslation('slugs');

  return (
    <footer className="px-8 md:px-16 py-6 font-raptor font-bold text-white text-s flex flex-col lg:flex-row bg-gradient-to-bl from-red-300 to-pink-300 lg:items-center">
      <div className="mb-4 lg:order-2 lg:mb-0 lg:ml-8 flex">
        <SocialLink url={instagram_url} logo={instagramLogo} />
        <SocialLink url={x_url} logo={twitterLogo} />
      </div>
      <div className="flex flex-col lg:flex-row lg:order-1 lg:gap-x-4">
        {main_items
          ?.filter((i) => i.about?.slug && i.title)
          ?.map((item, iI) => (
            <Link href={`/${tSlugs('about')}/${item.about.slug}`} key={iI}>
              <a className="hover:text-black">{item.title}</a>
            </Link>
          ))}
      </div>
      <div className="flex flex-col lg:flex-row lg:ml-auto lg:order-3 lg:gap-x-4">
        {secondary_items
          ?.filter((i) => i.about?.slug && i.title)
          ?.map((item, iI) => (
            <Link href={`/${tSlugs('about')}/${item.about.slug}`} key={iI}>
              <a className="hover:text-black">{item.title}</a>
            </Link>
          ))}
      </div>
    </footer>
  );
}
