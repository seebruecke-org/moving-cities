import Columns from '@/components/Columns';
import Summary from '@/components/Summary';

export default function CityHeader({ title, subtitle, summary }) {
  return (
    <header className="bg-yellow-300 pb-20 px-8 md:px-20 mb-8">
      <Columns>
        <div></div>

        <div className="pt-20">
          <h1 className="font-raptor font-bold text-red-300 text-2xl md:text-6xl leading-none">
            {title}
          </h1>

          <p className="font-raptor font-bold text-4xl leading-none">{subtitle}</p>
        </div>
      </Columns>

      {summary && (
        <div className="mt-8">
          <Summary items={summary} />
        </div>
      )}
    </header>
  );
}
