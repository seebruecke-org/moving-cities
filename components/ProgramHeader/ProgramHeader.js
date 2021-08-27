import { useTranslation } from 'next-i18next';

import Button from '@/components/Button';
import CityIcon from '@/components/CityIcon';
import Columns from '@/components/Columns';

export default function ProgramHeader({ city, title, icon, children, categories }) {
  const { t: tSlugs } = useTranslation('slugs');

  return (
    <header className="bg-yellow-300 grid py-20 pt-20 px-8 mb-12">
      <Columns className="max-w-8xl">
        <CityIcon icon={icon} className="w-2/4 md:w-full" />

        <div className="mt-16 md:mt-0 space-y-10">
          <h1 className="font-raptor font-bold">
            <span className="block text-3xl text-red-300">{city}</span>
            <span className="font-raptor text-4xl md:text-5xl font-bold leading-none">{title}</span>
          </h1>

          {categories?.length > 0 && (
            <ul className="flex flex-wrap">
              {categories.map(({ title, slug }) => (
                <li>
                  <Button href={`/${tSlugs('approaches')}/${slug}`} className="mr-6 mb-6">
                    {title}
                  </Button>
                </li>
              ))}
            </ul>
          )}

          {children}
        </div>
      </Columns>
    </header>
  );
}
