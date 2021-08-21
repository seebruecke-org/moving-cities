import { BLOCK_PREFIX } from '@/lib/blocks';

export default function BlockSwitch({ blocks = [], renderers = {} }) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  const prefixedRenderers = Object.entries(renderers).reduce((acc, [key, value]) => {
    acc[`${BLOCK_PREFIX}${key}`] = value;
    return acc;
  }, []);

  return (
    <div className="flex flex-col">
      {blocks.map(({ __typename, ...block }) => {
        const Component = prefixedRenderers?.[__typename] ?? null;

        if (Component === null) {
          return <pre>Block {__typename} not implemented</pre>;
        }

        return <Component {...block} />;
      })}
    </div>
  );
}
