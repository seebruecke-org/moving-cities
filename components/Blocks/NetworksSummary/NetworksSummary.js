import Button from '@/components/Button';
import Heading from '@/components/Heading';
import Markdown from '@/components/Markdown';

export default function NetworksSummary({ networksSummaryTitle, networksSummaryContent }) {
  return (
    <section className="bg-yellow-300 pt-16 pb-16 px-8 md:px-28">
      <div className="max-w-8xl md:grid md:grid-cols-9">
        <div className="md:col-start-4 md:col-span-5">
          <Heading level={2}>{networksSummaryTitle}</Heading>

          <div className="mt-6 md:mt-12">
            <Markdown>{networksSummaryContent}</Markdown>
          </div>

          <Heading level={3} as={4} className="mt-16">
            Member of the following networks
          </Heading>

          <div className="flex mt-6 max-w-full flex-wrap">
            <Button className="mr-6 mb-6">Solidarity City</Button>

            <Button className="mr-6 mb-6">Solidarity City</Button>

            <Button className="mr-6 mb-6">Solidarity City</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
