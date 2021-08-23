import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Markdown from "@/components/Markdown";

export default function NetworksSummary({ networksSummaryTitle, networksSummaryContent }) {
  return <section className="bg-yellow-300 py-12 px-8 md:px-10">
    <div className="max-w-8xl grid grid-cols-10">
      <div className="col-start-4 col-span-7">
        <Heading level={2}>{networksSummaryTitle}</Heading>

        <div className="mt-6 md:mt-8">
          <Markdown>
            {networksSummaryContent}
          </Markdown>
        </div>

        <Heading level={3} as={4}>
          Member of the following networks
        </Heading>

        <div className="flex space-x-4 mt-6">
          <Button>
            Solidarity City
          </Button>

          <Button>
            Solidarity City
          </Button>

          <Button>
            Solidarity City
          </Button>
        </div>
      </div>
    </div>
  </section>;
}
