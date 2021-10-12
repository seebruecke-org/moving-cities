import Paragraph from '@/components/Paragraph';

export default function ListItem({ children, isSmall }) {
  return (
    <li>
      <Paragraph isSmall={isSmall}>{children}</Paragraph>
    </li>
  );
}
