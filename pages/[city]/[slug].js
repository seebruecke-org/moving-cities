import Approach from '@/components/Approach';
import BlockSwitch from '@/components/Blocks/BlockSwitch';
import Columns from '@/components/Columns';
import ProgramHeader from '@/components/ProgramHeader';
import Heading from '@/components/Heading';
import Paragraph from '@/components/Paragraph';
import SidebarMenu from '@/components/SidebarMenu';

const MENU_ITEMS = [
  {
    target: '/amsterdam',
    label: 'About the City'
  },

  {
    target: '/amsterdam/top-program',
    label: 'Inspiring approaches',
    active: true,
    items: [
      {
        target: '/amsterdam/top-program',
        label: 'The TOP Program',
        active: true
      },

      {
        target: '/amsterdam/top-program',
        label: 'Hear of Brabant'
      }
    ]
  }
];

export default function CityProgramPage() {
  return (
    <div className="md:flex">
      <SidebarMenu items={MENU_ITEMS} />

      <article className="flex-grow">
        <ProgramHeader
          city="Amsterdam"
          title="Tilburg’s TOP ‘Language, Orientation and Participation’ programme (2017-2018)"
          pills={['Social Rights', 'Political Participation', 'Political whatever']}
        >
          <Heading level={2}>What is inspiring?</Heading>

          <Paragraph className="font-bold">
            From obligation to tailor-made support: What makes the case of TOP so inspiring is that it has been born out of difficult circumstances: In response to a controversial Participation Declaration for newcomers that narrowly focuses on values and norms, Tilburgs officials opted for a pragmatic and strategic approach. They saw an opportunity in the Participation Declaration to have a say on centrally coordinated national civic integration policies and viewed it as a stepping stone to develop an integrated programme that spanned 12 weeks. Instead of focusing only on norms and values, Tilburg’s orientation programme was tailored to the different needs and interests of newcomers.

          </Paragraph>
        </ProgramHeader>
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
    </div>
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
