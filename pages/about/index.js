import BlockSwitch from '@/components/Blocks/BlockSwitch';
import Heading from '@/components/Heading';
import SidebarMenu from '@/components/SidebarMenu';

const MENU_ITEMS = [
  {
    target: '/about',
    label: 'About',
    active: true
  },

  {
    target: '/about/partners',
    label: 'Partners & Contributors'
  },

  {
    target: '/about/more',
    label: 'Another chapter'
  }
];

export default function Page() {
  return (
    <div className="md:flex">
      <SidebarMenu items={MENU_ITEMS} />

      <article>
        <Heading level={1} className="pl-10 pt-10">
          About
        </Heading>

        <BlockSwitch
          blocks={[
            {
              __typename: 'Intro',
              content: `The project "The Moving Cities Map" aims to make visible how European cities and municipalities are actively supporting solidarity-based migration policies.`
            },

            {
              __typename: 'Section',
              title: 'What is unique about Tilburg?',
              content: `The aim of the project is to strengthen the political role of these cities, further, to encourage many more cities to advocate for a solidarity and human rights-based migration policy in Europe as well as for better inclusion and participation programmes within their own municipalities.`
            },

            {
              __typename: 'Section',
              content: `The idea for the project "The Moving Cities Map" was developed in a European networking process in which over 20 different European initiatives were involved. Part of these initiatives builded the consortium From Sea To the City. This consortium is organizing a conference and networking activities between different European municipalities and the civil society - with the same goal – to enhance the role of municipalities within European migration policies.  The project was implemented by the project partners Seebrücke, Rosa-Luxemburg-Stiftung, Heinrich-Böll-Stiftung and Tesserae. The project was financially supported by the Robert Bosch Foundation and the endowment fund Zivile Seenotrettung.
          `
            },

            {
              __typename: 'Section',
              content: `The project was implemented by the project partners Seebrücke, Rosa-Luxemburg-Stiftung, Heinrich-Böll-Stiftung and Tesserae. The project was financially supported by the Robert Bosch Foundation and the endowment fund Zivile Seenotrettung.
          `
            },

            {
              __typename: 'Section',
              title: 'Selection of Cities',
              content: `The cities on the map have been selected according to whether they have publicly declared some form of solidarity with refugees in the last five years or are active in a network that is committed to a solidarity-based migration policy. The selection does not claim to be complete, even though we would like it to be. If you have noticed cities that are missing, we would be happy to hear from you via our contact form.`
            },

            {
              __typename: 'Section',
              content: `The cities for which a city profile was written were selected based on whether they were more progressive in several predefined categories compared to other cities in their country. Furthermore, we took into consideration to represent a certain diversity in the size of the city or the geographical location of the cities. Unfortunately, due to the lack of resources we had to limit ourselves to a certain number of cities. There are more cities in Europe that have interesting approaches to show, but unfortunately we were not able to investigate them.`
            },

            {
              __typename: 'Section',
              content: `We would like to point out that there are cities in Europe that show solidarity, but because of their political context cannot and do not want to make public statements and do not want to be shown publicly.`
            }
          ]}
        />
      </article>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    revalidate: 60,
    props: {}
  };
}
