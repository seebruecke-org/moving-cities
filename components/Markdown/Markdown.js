import ReactMarkdown from 'react-markdown';

import Paragraph from '@/components/Paragraph';
import Heading from '../Heading';

const components = {
  h2: ({ children }) => {
    return <Heading level={2}>{children}</Heading>;
  },

  p: ({ children }) => {
    return <Paragraph className="mb-6">{children}</Paragraph>;
  }
};

export default function Markdown({ children }) {
  return <ReactMarkdown components={components}>{children}</ReactMarkdown>;
}
