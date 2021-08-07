import clsx from 'clsx';
import Item from './Item';

export default function FloatingTabs({ items }) {
  return (
    <ul className="md:absolute md:top-12 md:right-12 flex bg-white md:rounded-lg overflow-hidden z-10 shadow-lg">
      {items.map((item, index) => (
        <li className={clsx('w-2/3 md:w-auto', index > 0 && 'border-l border-grey-300')}>
          <Item {...item} />
        </li>
      ))}
    </ul>
  );
}
