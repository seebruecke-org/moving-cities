import CityIcon from '@/components/CityIcon';
import Columns from '@/components/Columns';
import Summary from '@/components/Summary';

export default function CityHeader({ title, subtitle, takeaways, icon }) {
  return (
    <header className="bg-yellow-300 py-10 md:py-20 px-8 md:pt-20 mb-12">
      <Columns className="max-w-8xl items-center">
        <CityIcon icon={icon} />

        <div>
          <h1 className="font-raptor font-bold text-red-300 text-5xl md:text-6xl leading-none">
            {title}
          </h1>

          <p className="font-raptor font-bold text-3xl md:text-4xl leading-none">{subtitle}</p>
        </div>
      </Columns>

      {takeaways && (
        <div className="mt-20 md:pl-48 max-w-8xl">
          <Summary items={takeaways} />
        </div>
      )}
    </header>
  );
}
