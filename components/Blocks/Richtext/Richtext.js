import ReactMarkdown from 'react-markdown';

import Heading from './Heading';
import Link from './Link';
import List from './List';
import ListItem from './ListItem';
import Paragraph from './Paragraph';

const renderers = {
  heading: ({ children, node, ...props }) => <Heading {...props}>{children}</Heading>,

  link: ({ children, node, ...props }) => <Link {...props}>{children}</Link>,

  list: ({ ordered = false, children }) => <List type={ordered ? 'ordered' : 'unordered'}>{children}</List>,

  listItem: ({ children }) => <ListItem>{children}</ListItem>,

  paragraph: ({ node, ...props }) => <Paragraph {...props} />
};

export default function Richtext({ richtext, ...props }) {
  return (
    <ReactMarkdown renderers={renderers} {...props}>
      {richtext}
    </ReactMarkdown>
  );
}
