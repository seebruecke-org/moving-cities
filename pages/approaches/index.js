import { useRouter } from 'next/router';

import Approach from '@/components/Approach';
import Heading from '@/components/Heading';
import Paragraph from '@/components/Paragraph';
import Pill from '@/components/Pill';
import Select from '@/components/Select';
import SEO from '@/components/SEO';

import { getTranslations } from '@/lib/global';
import { useTranslation } from 'next-i18next';

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
    target: '/approaches?filter=inclusion',
    label: 'Inclusion'
  },

  {
    target: '/approaches?filter=residence-security',
    label: 'Resident Security'
  }
];

export default function ApproachesOverviewPage() {
  const router = useRouter();
  const { t: tApproaches } = useTranslation('approaches');

  const onChange = ({ value }) => {
    router.push(value);
  };

  return (
    <div className="px-6 md:pl-72 md:pr-0 pb-28">
      <SEO title={tApproaches('inspiringApproaches')} />

      <Heading level={1} className="my-10 md:mb-28">
        {tApproaches('inspiringApproaches')}
      </Heading>

      <Paragraph className="font-bold">{tApproaches('intro')}</Paragraph>

      <ul className="space-x-4 hidden md:flex">
        {PILLS.map(({ label, ...pill }) => (
          <li>
            <Pill {...pill}>{label}</Pill>
          </li>
        ))}
      </ul>

      <Select
        options={PILLS.map(({ target, label }) => ({ value: target, label }))}
        onChange={onChange}
        className="md:hidden my-10"
      />

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        {APPROACHES.map((approach) => (
          <li>
            <Approach {...approach} />
          </li>
        ))}
      </ul>
    </div>
  );
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
