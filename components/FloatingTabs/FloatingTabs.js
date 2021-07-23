import Item from './Item';

export default function FloatingTabs({ items }) {
  return (
    <ul className="md:absolute md:top-12 md:right-12 flex bg-white md:rounded-lg overflow-hidden z-10 shadow-lg">
      {items.map((item) => (
        <li>
          <Item {...item} />
        </li>
      ))}
    </ul>
  );
}
