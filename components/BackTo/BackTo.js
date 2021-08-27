import Link from 'next/link';

export default function BackTo({ title, uri }) {
  return (
    <header>
      <Link href={uri}>
        <a className="font-bold font-raptor text-xl block py-6 shadow-xl px-8 hover:text-red-300">
          <span className="text-red-300 mr-2">⟵</span>
          {title}
        </a>
      </Link>
    </header>
  );
}
