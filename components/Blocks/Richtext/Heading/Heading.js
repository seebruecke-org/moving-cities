import * as styles from './heading.styles';

export default function Heading({ level = 1, children, ...props }) {
  const Tag = `h${level}`;

  return (
    <Tag css={styles[Tag]} {...props}>
      {children}
    </Tag>
  );
}
