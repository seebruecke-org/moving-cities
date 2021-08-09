import { useTranslation } from 'next-i18next';

import FloatingTabs from '@/components/FloatingTabs';
import MapboxMap from '@/components/MapboxMap';
import NetworkPreview from '@/components/NetworkPreview';
import SEO from '@/components/SEO';
import ThreadList from '@/components/ThreadList';

import { getTranslations } from '@/lib/global';

export default function AllNetworksOverview() {
  const { t: tCity } = useTranslation('city');
  const { t: tSlugs } = useTranslation('slugs');

  return (
    <div className="flex flex-col md:flex-row md:h-full">
      <SEO title="All networks" />

      <FloatingTabs
        items={[
          {
            target: '/',
            label: tCity('featuredCities')
          },

          {
            target: `/${tSlugs('cities')}`,
            label: tCity('allCities')
          },

          {
            target: `/${tSlugs('networks')}`,
            label: tCity('networks'),
            active: true
          }
        ]}
      />

      <ThreadList
        pane={NetworkPreview}
        items={[
          {
            target: '/what',
            title: 'With Refugees',
            subtitle: 'Germany',
            data: {
              title: 'Intercultural Cities',
              content: [
                {
                  __typename: 'Richtext',
                  content: [`The Intercultural Cities programme is a joint initiative between the Council of Europe and the European Commission. It seeks to explore the potential of an intercultural approach to integration in communities with culturally diverse populations. The cities participating in the programme are reviewing their governance, policies, discourse and practices from an intercultural point of view. In the past, this review has taken the form of narrative reports and city profiles – a form which is rich in content and detail. However, it is relatively weak as a tool to monitor and communicate progress. The new intercultural city index has been designed as a new benchmarking tool for the cities taking part in the pilot phase of the programme as well as future participants.`,

                  `The optimal intercultural city strategy would involve a formal statement by local authorities sending an unambiguous message of the city's commitment to intercultural principles as well as actively engaging and persuading other key local stakeholders to do likewise. The rate ofachievement of Amadora’s commitment policy goals is lower than the city sample’s2: only50% of these goals were achieved, while the city sample’s rate for commitment policy is 74%.`,

                  `Amadora has adopted a number of initiatives which demonstrate its commitment to the intercultural approach. The city council has formally adopted a public statement in favour of diversity, peace and co-existence. The local government has designed an intercultural strategy. It has allocated a budget for the implementation of its intercultural strategy. Amadora also makes clear reference to its intercultural commitment in the city’s speeches and communication. According to the answers provided in the survey, Amadora is also “seriously considering”setting up a dedicated cross-departmental co-ordination structure to be responsible for its intercultural strategy and action plan.`].join('\n\n\n')
                }
              ],
              featuredCities: [
                {
                  name: 'Marseille'
                },

                {
                  name: 'Tilburg'
                }
              ],

              cities: [
                {
                  name: 'Arezzo (Italy)'
                }
              ]
            }
          },

          {
            target: '/what',
            title: 'Arrival Cities',
            subtitle: 'France',
            data: {
              title: 'Amsterdam',
              subtitle: 'Groundbreaking player in migration policies',
              uri: '/amsterdam'
            }
          },

          {
            target: '/what',
            title: 'City of Sanctuary UK',
            subtitle: 'United Kingdom',
            data: {
              title: 'Amsterdam',
              subtitle: 'Groundbreaking player in migration policies',
              uri: '/amsterdam'
            }
          }
        ]}
      />

      <MapboxMap />
    </div>
  );
}

export async function getStaticProps({ locale }) {
  const translations = await getTranslations(locale, ['city']);

  return {
    revalidate: 60,
    props: {
      ...translations
    }
  };
}
