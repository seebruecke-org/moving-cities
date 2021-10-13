import clsx from "clsx";

export default function List({ ordered, children }) {
  const TagName = ordered ? 'ol' : 'ul';

  return <TagName className={clsx("ml-8 mt-4", ordered ? 'list-decimal' : 'list-disc')}>{children}</TagName>;
}
