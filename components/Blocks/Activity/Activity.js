import Blocks from '../';

export default function Activity({ activity: { content } }) {
  return <Blocks blocks={content} />;
}
