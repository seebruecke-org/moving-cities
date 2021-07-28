import BlockSwitch from '@/components/Blocks/BlockSwitch';
import Heading from '@/components/Heading';
import SidebarMenu from '@/components/SidebarMenu';

const MENU_ITEMS = [
  {
    target: '/about',
    label: 'About',
  },

  {
    target: '/about/partners',
    label: 'Partners & Contributors',
    active: true,
  },

  {
    target: '/about/more',
    label: 'Another chapter',
  }
];

export default function Page() {
  return <div className="md:flex">
    <SidebarMenu items={MENU_ITEMS} />

    <article>
      <Heading level={1}>
        Partners &amp; Contributors
      </Heading>

      <BlockSwitch blocks={[
        {
          __typename: 'Section',
          title: 'What is unique about Tilburg?',
          content: `The aim of the project is to strengthen the political role of these cities, further, to encourage many more cities to advocate for a solidarity and human rights-based migration policy in Europe as well as for better inclusion and participation programmes within their own municipalities.`
        },
      ]} />
    </article>
  </div>;
}

export async function getStaticPaths() {
  return {
    paths: ['/about/partners'],
    fallback: 'blocking'
  }
}

export async function getStaticProps({ locale }) {
  return {
    revalidate: 60,
    props: {}
  };
}
