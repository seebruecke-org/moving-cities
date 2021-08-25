import Button from '@/components/Button';
import Heading from '@/components/Heading';
import Markdown from '@/components/Markdown';

export default function NetworksSummary({ networksSummaryTitle, networksSummaryContent }) {
  return (
    <section className="bg-yellow-300 pt-12 pb-6 px-8 md:px-10">
      <div className="max-w-8xl md:grid md:grid-cols-10">
        <div className="md:col-start-4 md:col-span-7">
          <Heading level={2}>{networksSummaryTitle}</Heading>

          <div className="mt-6 md:mt-8">
            <Markdown>{networksSummaryContent}</Markdown>
          </div>

          <Heading level={3} as={4}>
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
