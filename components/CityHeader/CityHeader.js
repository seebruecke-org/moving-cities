export default function CityHeader({ title, subtitle }) {
  return (
    <header className="bg-yellow-300">
      <h1 className="font-raptor text-4xl md:text-6xl">{title}</h1>

      <p className="font-raptor text-xl">{subtitle}</p>
    </header>
  );
}
