import ReactMarkdown from 'react-markdown';

import Paragraph from '@/components/Paragraph';
import Heading from '../Heading';

export default function Markdown({ children, isSmall }) {
  const components = {
    h2: ({ children }) => {
      return <Heading level={2}>{children}</Heading>;
    },

    h3: ({ children }) => {
      return <Heading level={3}>{children}</Heading>;
    },

    p: ({ children }) => {
      return (
        <Paragraph className="mb-6" isSmall={isSmall}>
          {children}
        </Paragraph>
      );
    }
  };

  return <ReactMarkdown components={components}>{children}</ReactMarkdown>;
}
