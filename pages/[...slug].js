import { useTranslation } from 'next-i18next';

import Approach from '@/components/Approach';
import BlockSwitch from '@/components/Blocks/BlockSwitch';
import Columns from '@/components/Columns';
import CityHeader from '@/components/CityHeader';
import Heading from '@/components/Heading';
import SEO from '@/components/SEO';
import SidebarMenu from '@/components/SidebarMenu';

import { getTranslations } from '@/lib/global';

const MENU_ITEMS = [
  {
    target: '/',
    label: 'About the City',
    active: true
  },

  {
    target: '/palermo/charter',
    label: 'Inspiring approaches',
    items: [
      {
        target: '/palermo/charter',
        label: 'The Charter of Palermo'
      },

      {
        target: '/palermo/open-harbor',
        label: 'Open Harbors Policy'
      }
    ]
  }
];

export default function CityPage() {
  const { t } = useTranslation('approaches');

  return (
    <div className="md:flex">
      <SEO title="Palermo" />

      <SidebarMenu items={MENU_ITEMS} />

      <article className="flex-grow pb-28">
        <CityHeader
          title="Palermo"
          subtitle="The open-harbor city challenging European migration politics."
          summary={[
            'Proactive and pragmatic use of municipal policy space: »Going the extra mile«',
            'Regional cooperation and solidarity between municipalities: »Joining Forces«',
            'Systematic involvement of newcomers: »Nothing about us without us«'
          ]}
        />
        <BlockSwitch
          blocks={[
            {
              __typename: 'Section',
              title: 'What is unique about the city?',
              content: `**Overcoming the European border regime**: Palermo represents an extremely relevant example of a city committed to raise awareness about and advocate for a deep change in EU and national border policies, with a particular focus on maritime migration and search and rescue (SAR) activities in the Mediterranean Sea. In concrete terms, Palermo is also a city where several interesting practices in the field of migration and reception have been taking place, even if at times problems and shortcomings have arisen.`
            },

            /*{
              __typename: 'Quote',
              author: 'Ana Calou, Bürgermeisterin Barcelona',
              content: `A 12 week programme covering more than just norms and values`
            },*/

            {
              __typename: 'Section',
              title: 'What are the key factors?',
              content: `**Grassroots activism meets a spirited mayor**: Migrant-oriented solidarity in Palermo is the result of a mix of driving forces (grassroots activism, civil society more broadly and institutions). However, its external dimension, outside the city boundaries, is mostly connected with Mayor Orlando’s agenda and his political capital. By repeatedly declaring the city’s openness – at times almost pursuing a “migrant friendly” branding of the city – the mayor has been able to project a renewed image of Palermo, arousing interest and fascination especially from abroad, playing on the contrast between the city of the Mafia, as Palermo used to be well-known in the past, and the city of rights and solidarity.`
            },

            {
              __typename: 'Section',
              title: 'What are the most outstanding results so far?',
              content: `**A European forerunner of alternative policies**: Building upon the commitment of the city administration and the credibility and strength of grass-roots initiatives, Palermo has successfully become increasingly visible across Europe and has led cities’ engagement for new external migration and border policies. The city of Palermo successfully shaped an EU-wide counter-narrative and policy discussion, related to the EU and national migration and border policies. The Charter of Palermo and the open harbours policy are two of the most significant approaches in this regard.`
            },

            {
              __typename: 'Section',
              title: 'Political activities and advocacy beyond the city level?',
              content: `Advocacy and contestation efforts of the city of Palermo have successfully managed to go far beyond rhetoric. Rather, they have triggered political processes, produced important changes in political positioning and further promoted cross-local networking and co-operation. The Palermo Charter Platform Process, and its most recent initiative From the sea to the city are particularly meaningful in such a perspective, insofar as they capitalise on this advocacy work, both in practical and symbolic terms. Cross-local co-operation with other cities has also been a key component of these advocacy efforts, and can be important also in the coming future where Palermo aims to contribute to a network of solidarity cities that opposes the exclusionary migration policies of the EU.`
            }

            /*{
              __typename: 'Context',
              title: 'Political Context of the Netherlands',
              content: [`Dutch asylum and integration policies for refugees form part of a complex multi-level governance of migration. Immigration policies for asylum seekers and refugees are centralised. Integration policies were first decentralised (Integration Act 2007), then centralised (Integration Act 2013) only to be decentralised again in 2022.`,

              `## The Dutch restrictive turn in asylum and migration governance`,

              `In 2019, asylum seekers constituted almost 6 percent of the total immigration to the Netherlands. Despite this relatively small share, the plight and rights of refugees and irregular migrants have increasingly become a field of contestation between national and local authorities in the Netherlands and a fault line between political parties nationally. Immigration, asylum and integration are at the heart of a shift from multiculturalist policies to a more restrictive national immigration and integration policy in response to the rise in far-right populism. This shift is accompanied by increasing anti-immigrant rhetoric of far and centre-right politicians.`,

              `Beyond the Dutch borders, this rhetoric is often associated with the far-right Freedom Party (PVV) of Geert Wilders. Less well-known is that the People’s Party for Freedom and Democracy (VVD) has also increasing adopted anti-immigration rhetoric. The party’s election campaigns refer, for instance, to its ambitions to suspend the right to asylum and to get out of obligations under the ‘outdated’ Refugee Convention. Opposition parties, refugee and human rights organisations stress that this rightward shift predates the turn of the century and is not just discursive. Apart from a stricter legislation, they cite, among others, the limitation of free legal assistance to asylum seekers, the linking of claims to social benefits and services to a valid residency status and the increasing immigration detention.`
            ]},*/
          ]}
        />

        <div className="px-8 max-w-7xl">
          <Columns>
            <Heading level={2}>
              {t('inspiringApproaches')}
            </Heading>

            <ul className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-6 mt-8 md:mt-0">
              {[
                {
                  title: 'The Charter of Palermo',
                  pillars: ['advocacy work', 'networking'],
                  uri: '/palermo/charter'
                },

                {
                  title: 'Open Harbors Policy',
                  pillars: ['advocacy work', 'networking'],
                  uri: '/palermo/open-harbors-policy'
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
    paths: ['/palermo'],
    fallback: 'blocking'
  };
}

export async function getStaticProps({ locale }) {
  const translations = await getTranslations(locale, ['approaches']);

  return {
    revalidate: 60,
    props: {
      ...translations
    }
  };
}
