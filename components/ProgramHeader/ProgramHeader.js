export default function ProgramHeader({ city, title }) {
  return (
    <header className="bg-yellow-300">
      <h1 className="text-6xl">
        <span className="block text-red-300">{city}</span>
        {title}
      </h1>
    </header>
  );
}
