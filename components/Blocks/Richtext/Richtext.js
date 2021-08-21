import Markdown from '@/components/Markdown';

export default function Richtext({ richtext: content }) {
  return <Markdown>{content}</Markdown>;
}
