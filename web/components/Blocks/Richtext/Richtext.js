import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import Paragraph from './Paragraph';

const renderers = {
  link: ({ children, node, ...props }) => (
    <Link {...props}>
      <a>{children}</a>
    </Link>
  ),

  paragraph: ({ node, ...props }) => <Paragraph {...props} />
};

export default function Richtext({ richtext }) {
  return <ReactMarkdown renderers={renderers}>{richtext}</ReactMarkdown>;
}
