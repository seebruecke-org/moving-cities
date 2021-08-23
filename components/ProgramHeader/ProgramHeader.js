import Columns from '@/components/Columns';

export default function ProgramHeader({ city, title, children }) {
  return (
    <header className="bg-yellow-300 grid pb-20 px-8 md:px-20 pt-20">
      <Columns className="max-w-8xl">
        <div></div>

        <div className="space-y-10">
          <h1 className="font-raptor font-bold">
            <span className="block text-3xl text-red-300">{city}</span>
            <span className="font-raptor text-5xl font-bold leading-none">{title}</span>
          </h1>

          {children}
        </div>
      </Columns>
    </header>
  );
}
