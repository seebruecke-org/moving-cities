import Columns from '@/components/Columns';

export default function CityHeader({ title, subtitle }) {
  return (
    <header className="bg-yellow-300 pb-20 px-20">
      <Columns>
        <div></div>

        <div className="pt-20">
          <h1 className="font-raptor font-bold text-red-300 text-4xl md:text-6xl leading-none">
            {title}
          </h1>

          <p className="font-raptor font-bold text-4xl leading-none">{subtitle}</p>
        </div>
      </Columns>
    </header>
  );
}
