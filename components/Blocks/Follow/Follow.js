import Button from '@/components/Button';
import Section from '@/components/Blocks/Section';

export default function Follow({ followTitle, followItems = [] }) {
  return (
    <Section title={followTitle}>
      <ul className="flex flex-wrap">
        {followItems.map(({ description, target }) => (
          <li className="mr-5 mb-4">
            <Button href={target}>
              {description}
              <span className="text-red-300 ml-2">→</span>
            </Button>
          </li>
        ))}
      </ul>
    </Section>
  );
}
