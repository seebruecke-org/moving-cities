export default function CountryPreview({ cities }) {
  return (
    <ul className="bg-yellow-300 p-10 h-full overflow-y-auto flex flex-col">
      {cities.map(({ name }) => (
        <li>{name}</li>
      ))}
    </ul>
  );
}
