import Approach from '@/components/Approach';
import BlockSwitch from '@/components/Blocks/BlockSwitch';
import Columns from '@/components/Columns';
import ProgramHeader from '@/components/ProgramHeader';
import Heading from '@/components/Heading';
import Paragraph from '@/components/Paragraph';
import SidebarMenu from '@/components/SidebarMenu';

const MENU_ITEMS = [
  {
    target: '/palermo',
    label: 'About the City'
  },

  {
    target: '/palermo/charter',
    label: 'Inspiring approaches',
    active: true,
    items: [
      {
        target: '/palermo/charter',
        label: 'The TOP Program',
        active: true
      },

      {
        target: '/palermo/open-harbors',
        label: 'Open Harbors Policy'
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
          city="Palermo"
          title="The Charter of Palermo"
          pills={['advocacy work', 'networking ']}
        >
          <Heading level={2}>What is inspiring?</Heading>

          <Paragraph className="font-bold">
            The Charter of Palermo is a political manifesto, launched in the context of an international conference of institutions and civil society initiatives and approved by the city government in March 2015. It is composed of several chapters, devoted to specific aspects of migration and rights, such as border regimes, the need to revise EU legislation and Italian citizenship laws, protection, political participation, work, housing, health, vulnerable migrant people and unaccompanied minors. Its subtitle reads: “From the [sic] migration as suffering, to mobility as an inalienable human right” – and it catches the essence of the political message behind the Charter.
          </Paragraph>
        </ProgramHeader>
        <BlockSwitch
          blocks={[
            {
              __typename: 'Section',
              title: 'What happened after the Charter was launched?',
              content: `The political, idealistic and non-binding nature of the Charter does not make it a purely rhetorical text. On the contrary, the Charter of Palermo had the power – as early as 2015, when the improperly called “refugee crisis” was about to deflagrate –  to offer an advocacy and contestation venue to a number of people who were willing to fight the EU and member states’ approach to migration. This is particularly true in the case of those local institutions and civil society initiatives, who echoed the Charter. Examples are the manifesto “We, the cities of Europe”, launched by the mayor of Barcelona, Ada Colau, in September 2015, or the Palermo Charter Platform Process, an initiative which has gathered since 2018 civil society organisations and European cities “to strengthen our work in the Mediterranean Sea and the transnational collaboration between solidarity cities in Europe (…) in the spirit of the Charter of Palermo.”`
            },

            {
              __typename: 'Section',
              title: 'What is the outcome?',
              content: `Overall, the Charter has been a crucial point of reference for those progressive actors who struggle to challenge the existing migration approach across Europe, and much of the advocacy, networking and visibility, which these efforts have experienced, has been in fact facilitated and amplified by the Charter. Clearly naming things in official documents can indeed be an important driver of change in certain historical moments.`
            }
          ]}
        />
      </article>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: ['/palermo/charter'],
    fallback: 'blocking'
  };
}

export async function getStaticProps({ locale }) {
  return {
    revalidate: 60,
    props: {}
  };
}
