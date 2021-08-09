import BlockSwitch from '@/components/Blocks/BlockSwitch';
import Button from '@/components/Button';
import Heading from '@/components/Heading';

export default function NetworkPreview({ title, content, featuredCities, cities }) {
  return (
    <article className="bg-white h-full p-10 overflow-y-auto">
      <Heading level={1} as={2}>
        {title}
      </Heading>

      {content && <BlockSwitch blocks={content} />}

      {featuredCities && (
        <>
          <Heading level={2} as={3}>
            Featured cities
          </Heading>

          {featuredCities.map(({ name }) => (
            <Button>{name}</Button>
          ))}
        </>
      )}

      {cities && (
        <>
          <Heading level={2} as={3}>
            All cities
          </Heading>

          <ul>
            {cities.map(({ name }) => (
              <li>{name}</li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}
