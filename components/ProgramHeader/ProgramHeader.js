import Button from '@/components/Button';
import CityIcon from '@/components/CityIcon';
import Columns from '@/components/Columns';

export default function ProgramHeader({ city, title, icon, children, categories }) {
  return (
    <header className="bg-yellow-300 grid py-20 pt-20 px-8 mb-12">
      <Columns className="max-w-8xl">
        <CityIcon icon={icon} />

        <div className="space-y-10">
          <h1 className="font-raptor font-bold">
            <span className="block text-3xl text-red-300">{city}</span>
            <span className="font-raptor text-5xl font-bold leading-none">{title}</span>
          </h1>

          {categories?.length > 0 && (
            <ul className="flex flex-wrap">
              {categories.map(({ title }) => (
                <li>
                  <Button className="mr-6 mb-6">{title}</Button>
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
