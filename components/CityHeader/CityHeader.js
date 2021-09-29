import CityIcon from '@/components/CityIcon';
import Columns from '@/components/Columns';
import Summary from '@/components/Summary';

export default function CityHeader({ title, subtitle, takeaways, icon }) {
  return (
    <header className="bg-yellow-300 pb-10 md:pb-32 px-8 pt-10 md:pt-14 mb-20">
      <Columns className="md:pl-40 max-w-8xl items-center">
        <CityIcon icon={icon} className="w-2/4 md:w-full md:min-h-full" />

        <div className="mt-12 md:mt-0">
          <h1 className="font-raptor font-bold text-red-300 text-4xl md:text-5xl lg:text-6xl leading-none">
            {title}
          </h1>

          <p className="font-raptor font-bold text-xl md:text-4xl leading-none mt-4 md:-mt-2">
            {subtitle}
          </p>
        </div>
      </Columns>

      {takeaways && (
        <div className="mt-28 md:mt-48 md:pl-44 max-w-8xl">
          <Summary items={takeaways} />
        </div>
      )}
    </header>
  );
}
