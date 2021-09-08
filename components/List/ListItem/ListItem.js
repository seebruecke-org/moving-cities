import Paragraph from '@/components/Paragraph';

export default function ListItem({ children }) {
  return (
    <li>
      <Paragraph isSmall={false}>{children}</Paragraph>
    </li>
  );
}
