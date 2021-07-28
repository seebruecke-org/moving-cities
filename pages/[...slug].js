import Approach from '@/components/Approach';
import BlockSwitch from '@/components/Blocks/BlockSwitch';
import Columns from '@/components/Columns';
import CityHeader from '@/components/CityHeader';
import Heading from '@/components/Heading';
import SidebarMenu from '@/components/SidebarMenu';

const MENU_ITEMS = [
  {
    target: '/',
    label: 'About the City',
    active: true,
  },

  {
    target: '/amsterdam/top-program',
    label: 'Inspiring approaches',
    items: [
      {
        target: '/amsterdam/top-program',
        label: 'The TOP Program'
      },

      {
        target: '/amsterdam/top-program',
        label: 'Hear of Brabant'
      }
    ]
  }
];

export default function CityPage() {
  return (
    <div className="md:flex">
      <SidebarMenu items={MENU_ITEMS} />

      <article className="flex-grow">
        <CityHeader title="Amsterdam" subtitle="The surprising impact of regional Solidarity" />
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
            },

            {
              __typename: 'Section',
              title: 'Download the full city report',
              content: `The city report contains all the information about the city’s migration policies, its approaches and political context.`
            },

            {
              __typename: 'Context',
              title: 'Political Context of the Netherlands',
              content: [`Dutch asylum and integration policies for refugees form part of a complex multi-level governance of migration. Immigration policies for asylum seekers and refugees are centralised. Integration policies were first decentralised (Integration Act 2007), then centralised (Integration Act 2013) only to be decentralised again in 2022.`,

              `## The Dutch restrictive turn in asylum and migration governance`,

              `In 2019, asylum seekers constituted almost 6 percent of the total immigration to the Netherlands. Despite this relatively small share, the plight and rights of refugees and irregular migrants have increasingly become a field of contestation between national and local authorities in the Netherlands and a fault line between political parties nationally. Immigration, asylum and integration are at the heart of a shift from multiculturalist policies to a more restrictive national immigration and integration policy in response to the rise in far-right populism. This shift is accompanied by increasing anti-immigrant rhetoric of far and centre-right politicians.`,

              `Beyond the Dutch borders, this rhetoric is often associated with the far-right Freedom Party (PVV) of Geert Wilders. Less well-known is that the People’s Party for Freedom and Democracy (VVD) has also increasing adopted anti-immigration rhetoric. The party’s election campaigns refer, for instance, to its ambitions to suspend the right to asylum and to get out of obligations under the ‘outdated’ Refugee Convention. Opposition parties, refugee and human rights organisations stress that this rightward shift predates the turn of the century and is not just discursive. Apart from a stricter legislation, they cite, among others, the limitation of free legal assistance to asylum seekers, the linking of claims to social benefits and services to a valid residency status and the increasing immigration detention.`
            ]},
          ]}
        />

        <div className="max-w-7xl">
          <Columns>
            <Heading level={2}>Inspiring approaches of the city</Heading>

            <ul className="flex space-x-6">
              {[
                {
                  title: 'TOP ‘Language, Orientation and Participation’ programme (2017-2018)',
                  pillars: ['Social Rights', 'Residence Security', 'Communal Reception'],
                  uri: '/amsterdam/top-programme'
                },

                {
                  title: 'TOP ‘Language, Orientation and Participation’ programme (2017-2018)',
                  pillars: ['Social Rights', 'Residence Security', 'Communal Reception'],
                  uri: '/amsterdam/top-programme'
                }
              ].map((approach) => (
                <li>
                  <Approach {...approach} />
                </li>
              ))}
            </ul>
          </Columns>
        </div>
      </article>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: ['/amsterdam'],
    fallback: 'blocking'
  };
}

export async function getStaticProps({ locale }) {
  return {
    revalidate: 60,
    props: {}
  };
}
