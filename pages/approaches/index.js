import Approach from '@/components/Approach';
import Heading from '@/components/Heading';
import Paragraph from '@/components/Paragraph';
import Pill from '@/components/Pill';

const APPROACHES = [
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
];

const PILLS = [
  {
    target: '/approaches/inclusion',
    label: 'Inclusion'
  },

  {
    target: '/approaches/residence-security',
    label: 'Resident Security'
  }
];

export default function ApproachesOverviewPage() {
  return (
    <>
      <Heading level={1}>Inspiring Approaches</Heading>

      <Paragraph className="font-bold mt-20">
        We collected 55 inspiring local approaches which cities have implemented in their politics.
        Which topic are you interested in?
      </Paragraph>

      <ul className="flex space-x-4">
        {PILLS.map(({ label, ...pill }) => (
          <li>
            <Pill {...pill}>{label}</Pill>
          </li>
        ))}
      </ul>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        {APPROACHES.map((approach) => (
          <li>
            <Approach {...approach} />
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    revalidate: 60,
    props: {}
  };
}
