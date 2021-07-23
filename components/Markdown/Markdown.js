import ReactMarkdown from 'react-markdown';

import Paragraph from '@/components/Paragraph';

const components = {
  p: ({ children }) => {
    return <Paragraph>{children}</Paragraph>;
  }
};

export default function Markdown({ children }) {
  return <ReactMarkdown components={components}>{children}</ReactMarkdown>;
}
