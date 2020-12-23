import { useSelector } from 'react-redux'

import Layout from '../../components/Layout';

import CityListItem from '../../components/CityListItem';
import Main from '../../components/Main';
import Map from '../../components/Map';
import MapOverlay from '../../components/MapOverlay';
import Navigation from '../../components/Navigation';
import Sidebar from '../../components/Sidebar';
import SidebarList from '../../components/SidebarList';

import { fetcher } from '../../lib/hooks/useAPI';

export default function CityPage({ name, slug }) {
    const cities = useSelector((state) => state.cities);
    const navigation = useSelector((state) => state.navigation);

    return (
        <Layout>
            <Main>
                <Map />
                <MapOverlay>
                    <h1>{name}</h1>
                </MapOverlay>
            </Main>

            <Sidebar>
                <Navigation items={navigation} />

                <SidebarList label="City profiles">
                    {cities && cities.map(city => {
                        const cityProps = {
                            ...city,
                            isActive: slug === city.slug
                        }

                        return <CityListItem {...cityProps} />;
                    })}
                </SidebarList>
            </Sidebar>
        </Layout>
    )
}

export async function getStaticProps({ params: { slug }}) {
    const [country, citySlug] = slug;

    const { cities, city } = await fetcher(`
        query {
            cities {
                name
                slug

                country {
                    slug
                }
            }

            city: cities(where: { slug: "${citySlug}" }) {
                name
                slug
            }
        }
    `);

    return {
        props: {
            initialReduxState: {
                cities
            },
            ...city[0]
        }
    }
}

export async function getStaticPaths() {
    const { cities } = await fetcher(`
        query {
            cities {
                name
                slug

                country {
                    slug
                }
            }
        }
    `);

    return {
        fallback: false,
        paths: cities.map(({ slug, country: { slug: countrySlug }}) => `/cities/${countrySlug}/${slug}`)
    }
}
