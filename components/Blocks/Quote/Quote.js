export default function Quote({ quoteAuthor: author, quoteContent: content }) {
  return (
    <blockquote className="w-full grid grid-cols-10 max-w-8xl my-8 md:my-16 pr-10 pl-10 md:pr-10">
      <p className="text-4xl md:text-3xl font-bold font-raptor leading-tight col-span-full md:col-span-8">
        <span className="text-red-300">“</span>
        {content}
        <span className="text-red-300">”</span>
      </p>

      {author && (
        <cite className="font-raptor text-s not-italic col-span-8 leading-none mt-4 md:mt-0">
          {author}
        </cite>
      )}
    </blockquote>
  );
}
