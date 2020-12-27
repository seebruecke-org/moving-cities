import { fetcher } from '../lib/hooks/useAPI';

import Layout from '../components/Layout';

import Blocks from '../components/Blocks';
import Main from '../components/Main';

import { BLOCK_FRAGMENTS } from '../components/Blocks';

export default function Page({ title, content = [] }) {
  return (
    <Layout>
      <Main>
        <h1>{title}</h1>
        <Blocks blocks={content} />
      </Main>
    </Layout>
  );
}

export async function getStaticProps({ params: { slug } }) {
  const [pageSlug] = slug;
  const { pages } = await fetcher(`
        query {
            pages(where: { slug: "${pageSlug}" }) {
                title
                content {
                    ${BLOCK_FRAGMENTS}
                }
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
    fallback: false,
    paths: pages.map(({ slug }) => `/${slug}`)
  };
}
