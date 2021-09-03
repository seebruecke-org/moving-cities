import CityIcon from '@/components/CityIcon';
import Columns from '@/components/Columns';
import Summary from '@/components/Summary';

export default function CityHeader({ title, subtitle, takeaways, icon }) {
  return (
    <header className="bg-yellow-300 pb-10 md:pb-32 px-8 pt-10 md:pt-14 mb-20">
      <Columns className="max-w-8xl items-center">
        <CityIcon icon={icon} className="md:pl-48 w-2/4 md:w-full" />

        <div className="mt-12 md:mt-0">
          <h1 className="font-raptor font-bold text-red-300 text-5xl md:text-6xl leading-none">
            {title}
          </h1>

          <p className="font-raptor font-bold text-2xl md:text-4xl leading-tight -mt-2">
            {subtitle}
          </p>
        </div>
      </Columns>

      {takeaways && (
        <div className="mt-48 md:pl-44 max-w-8xl">
          <Summary items={takeaways} />
        </div>
      )}
    </header>
  );
}
