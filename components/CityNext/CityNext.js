import Link from 'next/link';

export default function CityNext({ name, uri, subtitle }) {
  return (
    <Link href={uri}>
      <a className="flex flex-col items-center bg-gradient-to-br from-red-300 to-pink-300 py-20 hover:from-black hover:to-black hover:text-white font-raptor text-xl font-medium">
        <div className="max-w-8xl">
          Next Featured City
          <span className="sr-only">:</span>
          <span className="text-5xl font-bold block">{name}</span>
          <span className="text-3xl font-bold">{subtitle}</span>
        </div>
      </a>
    </Link>
  );
}
