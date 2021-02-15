import { fetcher } from '../lib/hooks/useAPI';

import Layout from '../components/Layout';

import Main from '../components/Main';
import Page, { FRAGMENT as PAGE_FRAGMENT } from '../components/Page';
import SEO from '../components/SEO';

export default function GenericPage(props) {
  return (
    <Layout sidebar={false}>
      <SEO title={props.title} />

      <Main>
        <Page {...props} />
      </Main>
    </Layout>
  );
}

export async function getStaticProps({ params: { slug } }) {
  const [pageSlug] = slug;

  if (!pageSlug) {
    return {
      notFound: true,
      props: {}
    };
  }

  const { pages } = await fetcher(`
        query {
            pages(where: { slug: "${pageSlug}" }) {
                ${PAGE_FRAGMENT}
            }
        }
    `);

  return {
    props: {
      ...pages[0]
    }
  };
}

export async function getStaticPaths() {
  const { pages } = await fetcher(`
        query {
            pages {
                slug
            }
        }
    `);

  return {
    fallback: true,
    paths: pages.map(({ slug }) => `/${slug}`)
  };
}
