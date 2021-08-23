export default function Quote({ quoteAuthor: author, quoteContent: content }) {
  return (
    <blockquote className="w-full max-w-8xl my-8 md:my-16 pr-10 pl-10 md:pr-10">
      <p className="text-4xl md:text-5xl font-bold font-raptor leading-tight">
        <span className="text-red-300">“</span>
        {content}
        <span className="text-red-300">”</span>
      </p>

      {author && <cite className="font-raptor text-xl not-italic">{author}</cite>}
    </blockquote>
  );
}
