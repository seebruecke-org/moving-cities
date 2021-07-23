import Approach from '@/components/Approach';
import BlockSwitch from '@/components/Blocks/BlockSwitch';
import Columns from '@/components/Columns';
import ProgramHeader from '@/components/ProgramHeader';
import Heading from '@/components/Heading';

export default function CityProgramPage() {
  return (
    <article>
      <ProgramHeader city="Amsterdam" title="The surprising impact of regional Solidarity" />
      <BlockSwitch
        blocks={[
          {
            __typename: 'Section',
            title: 'What is unique about Tilburg?',
            content: `Regional solidarity and pragmatic solutions: What sets Tilburg apart from other progressive Dutch municipalities is its focus on regional solidarity and prompt efforts to remedy the shortcomings of the Dutch (civic) integration policies. Moreover, newcomers are actively involved in policy processes and all migration policies aim for a stable environment and for mutual commitment between administration and newcomers.`
          },

          {
            __typename: 'Quote',
            author: 'Ana Calou, Bürgermeisterin Barcelona',
            content: `A 12 week programme covering more than just norms and values`
          },

          {
            __typename: 'Section',
            title: 'What is the focus of the local migration policies?',
            content: `The power of pragmatism and persistence: Tilburg’s story is one of pragmatism and persistence, rather than explicit municipal disobedience. The city’s approach to migration governance is characterised by the pragmatic and consistent use of discretion and silent diplomacy, coordination of Dutch city networks, and close collaboration with local and regional partners, as well as the Dutch Ministry of Social Affairs.`
          }
        ]}
      />

      <Columns>
        <Heading level={2}>Inspiring approaches of the city</Heading>

        <ul className="flex">
          {[
            {
              title: 'TOP ‘Language, Orientation and Participation’ programme (2017-2018)',
              pillars: ['Social Rights', 'Residence Security', 'Communal Reception'],
              uri: '/amsterdam/top-programme'
            }
          ].map((approach) => (
            <Approach {...approach} />
          ))}
        </ul>
      </Columns>
    </article>
  );
}

export async function getStaticPaths() {
  return {
    paths: ['/amsterdam/top-programme'],
    fallback: 'blocking'
  };
}

export async function getStaticProps({ locale }) {
  return {
    revalidate: 60,
    props: {}
  };
}
