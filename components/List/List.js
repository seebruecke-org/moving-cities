export default function List({ ordered, children }) {
  const TagName = ordered ? 'ol' : 'ul';

  return <TagName className="list-disc ml-4 mt-4">
    {children}
  </TagName>
}
