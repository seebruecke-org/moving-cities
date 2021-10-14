import clsx from 'clsx';

export default function List({ ordered, children }) {
  const TagName = ordered ? 'ol' : 'ul';

  return (
    <TagName className={clsx('ml-8 my-4 lg:my-8', ordered ? 'list-decimal' : 'list-disc')}>
      {children}
    </TagName>
  );
}
