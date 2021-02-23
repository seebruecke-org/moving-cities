import { useSelector } from 'react-redux';
import { useWindowSize } from 'react-use';
import dynamic from 'next/dynamic';

import Layout from '../../components/Layout';

import CityListItem from '../../components/CityListItem';
import Main from '../../components/Main';
import MapOverlay from '../../components/MapOverlay';
import Navigation from '../../components/Navigation';
import CityProfile from '../../components/CityProfile';
import CountryProfile from '../../components/CountryProfile';
import SEO from '../../components/SEO';
import Sidebar from '../../components/Sidebar';
import SidebarList from '../../components/SidebarList';

import { fetcher } from '../../lib/hooks/useAPI';
import { getTranslations } from '../../lib/default';
import { hasProfile } from '../../lib/city';

import { BLOCK_FRAGMENTS } from '../../components/Blocks';
import { FRAGMENT as BLOCK_ACTIVITY } from '../../components/Blocks/Activity';

const Map = dynamic(() => import('../../components/Map'));

export default function CityPage({ slug, contentType, ...props }) {
  const cities = useSelector((state) => state.cities) || [];
  const navigation = useSelector((state) => state.navigation);
  const { width: windowWidth } = useWindowSize();
  const shouldShowCitiesList = windowWidth && windowWidth > 768;

  return (
    <Layout>
      <SEO title={props.name} />

      <Main>
        <Map />
        <MapOverlay>
          {contentType === 'city' && <CityProfile {...props} />}
          {contentType === 'country' && <CountryProfile {...props} />}
        </MapOverlay>
      </Main>

      <Sidebar>
        <Navigation items={navigation} />

        {shouldShowCitiesList && (
          <SidebarList label="City profiles">
            {cities.map(({ slug: citySlug, name, country }) => (
              <CityListItem
                key={`city-list-${slug}`}
                isActive={citySlug === slug}
                slug={citySlug}
                name={name}
                country={country}
              />
            ))}
          </SidebarList>
        )}
      </Sidebar>
    </Layout>
  );
}

export async function getStaticProps({ locale, params: { slug } }) {
  const lngDict = await getTranslations(locale);
  const [countrySlug, citySlug] = slug;

  let query = `
        country: countries(where: { slug: "${countrySlug}" }) {
            name
            content {
              __typename
              ${BLOCK_FRAGMENTS}
            }
        }
    `;

  if (citySlug) {
    query = `
            city: cities(where: { slug: "${citySlug}" }) {
                name
                slug
                intro_long {
                    ${BLOCK_FRAGMENTS}
                }

                chapter_1 {
                    ${BLOCK_FRAGMENTS}
                }

                chapter_2 {
                    ${BLOCK_FRAGMENTS}
                }

                chapter_3 {
                    ${BLOCK_FRAGMENTS}
                }

                chapter_4 {
                  __typename
                  ${BLOCK_ACTIVITY}
                }

                country {
                    slug
                    name
                }
            }
        `;
  }

  try {
    const { cities, city, country } = await fetcher(`
            query {
                cities(sort: "name") {
                    name
                    slug

                    country {
                        slug
                    }

                    intro_long {
                      __typename
                    }

                    chapter_1 {
                      __typename
                    }

                    chapter_2 {
                      __typename
                    }

                    chapter_3 {
                      __typename
                    }

                    chapter_4 {
                      __typename
                    }
                }

                ${query}
            }
        `);

    const isCity = city && city[0];
    const content = isCity ? city[0] : country[0];

    return {
      revalidate: 120,
      props: {
        initialReduxState: {
          cities: cities.filter(hasProfile).map(({ name, slug, country }) => ({
            name,
            slug,
            country
          }))
        },

        contentType: isCity ? 'city' : 'country',
        lngDict,
        ...content
      }
    };
  } catch (err) {
    console.log(err);

    return {
      props: {}
    };
  }
}

export async function getStaticPaths() {
  const { cities, countries } = await fetcher(`
        query {
            cities {
                name
                slug

                country {
                    slug
                }

                intro_long {
                  __typename
                }

                chapter_1 {
                  __typename
                }

                chapter_2 {
                  __typename
                }

                chapter_3 {
                  __typename
                }

                chapter_4 {
                  __typename
                }
            }

            countries {
                slug
            }
        }
    `);

  return {
    fallback: true,
    paths: [
      ...cities.filter(hasProfile).map(({ slug, country: { slug: countrySlug } }) => ({
        params: {
          slug: [countrySlug, slug]
        }
      })),
      ...countries.map(({ slug }) => `/cities/${slug}`)
    ]
  };
}
