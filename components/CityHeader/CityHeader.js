export default function CityHeader({ title, subtitle }) {
  return (
    <header className="bg-yellow-300">
      <h1 className="text-6xl">{title}</h1>

      <p>{subtitle}</p>
    </header>
  );
}
