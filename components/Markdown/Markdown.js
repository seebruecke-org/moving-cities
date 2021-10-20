import clsx from 'clsx';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import List, { ListItem } from '@/components/List';
import Paragraph from '@/components/Paragraph';
import Heading from '@/components/Heading';

export default function Markdown({ children, isSmall, classNames }) {
  const components = {
    a: ({ children, href }) => {
      return (
        <Link href={href}>
          <a className={clsx('underline hover:text-pink-300 break-words', classNames?.a)}>
            {children}
          </a>
        </Link>
      );
    },

    h2: ({ children }) => {
      return (
        <Heading level={2} className={clsx(classNames?.h2)}>
          {children}
        </Heading>
      );
    },

    h3: ({ children }) => {
      return (
        <Heading level={3} className={clsx('mt-8 mb-4', classNames?.h3)}>
          {children}
        </Heading>
      );
    },

    p: ({ children }) => {
      return (
        <Paragraph className={clsx('mb-6', classNames?.p)} isSmall={isSmall}>
          {children}
        </Paragraph>
      );
    },

    ul: ({ ordered, children }) => {
      return <List ordered={ordered}>{children}</List>;
    },

    ol: ({ ordered, children }) => {
      return <List ordered={ordered}>{children}</List>;
    },

    li: ({ children }) => {
      return <ListItem isSmall={isSmall}>{children}</ListItem>;
    }
  };

  return <ReactMarkdown components={components}>{children}</ReactMarkdown>;
}
