import ReactMarkdown from 'react-markdown';

import Heading from './Heading';
import Link from './Link';
import Paragraph from './Paragraph';

const renderers = {
  heading: ({ children, node, ...props }) => (
    <Heading {...props}>
      {children}
    </Heading>
  ),

  link: ({ children, node, ...props }) => (
    <Link {...props}>
      {children}
    </Link>
  ),

  paragraph: ({ node, ...props }) => <Paragraph {...props} />
};

export default function Richtext({ richtext }) {
  return <ReactMarkdown renderers={renderers}>{richtext}</ReactMarkdown>;
}
