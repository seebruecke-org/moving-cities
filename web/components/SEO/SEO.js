import Head from 'next/head';

export default function SEO({ title }) {
  return <Head>
    <title>
      {title} {title && '|'} Moving Cities
    </title>
  </Head>
}
