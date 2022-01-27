import Markdown from '@/components/Markdown';

export default function Richtext({ richtext: content, ...props }) {
  return <Markdown {...props}>{content}</Markdown>;
}
