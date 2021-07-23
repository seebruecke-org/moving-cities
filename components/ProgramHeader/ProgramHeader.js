export default function ProgramHeader({ city, title }) {
  return (
    <header className="bg-yellow-300">
      <h1 className="font-raptor text-4xl md:text-6xl font-bold">
        <span className="block text-red-300">{city}</span>
        <span className="font-raptor text-xl font-bold">{title}</span>
      </h1>
    </header>
  );
}
