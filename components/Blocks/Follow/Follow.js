import Button from '@/components/Button';
import Section from "@/components/Blocks/Section";

export default function Follow({ followTitle, followItems = [] }) {
  return <Section title={followTitle}>
    <ul className="flex flex-wrap space-x-4">
      {followItems.map(({ description, target }) => <li>
        <Button href={target}>
          {description}
          <span className="text-red-300 ml-2">→</span>
        </Button>
      </li>)}
    </ul>
  </Section>;
}
