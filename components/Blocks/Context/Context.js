import Heading from "@/components/Heading"
import Markdown from "@/components/Markdown"

export default function Context({ title, content }) {
  return <details className="border-t-4 border-b-4 my-8 md:my-16 py-2 md:py-4 cursor-pointer">
    <summary className="pl-10">
      <Heading level={2}>
        {title}
      </Heading>
    </summary>

    <div className="max-w-7xl mt-8 pl-10">
      <Markdown>
        {content.join('\n')}
      </Markdown>
    </div>
  </details>
}
