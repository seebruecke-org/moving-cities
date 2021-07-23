export default function Quote({ author, content }) {
  return (
    <blockquote>
      {author && <cite>{author}</cite>}

      <p className="text-l font-bold">{content}</p>
    </blockquote>
  );
}
