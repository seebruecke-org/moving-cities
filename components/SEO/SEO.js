import { useRouter } from 'next/router';
import Head from 'next/head';

export default function SEO({ title, description, metadata }) {
  const { locale } = useRouter();
  const normalizedTitle = metadata?.title ?? title;
  const normalizedDescription = metadata?.description || description;
  const image = metadata?.image;

  return (
    <Head>
      <title>
        {normalizedTitle} {normalizedTitle && '|'} Moving Cities
      </title>

      <meta property="og:title" content={normalizedTitle} />
      <meta name="twitter:title" content={normalizedTitle} />

      {normalizedDescription && (
        <>
          <meta name="description" content={normalizedDescription} />
          <meta property="og:description" content={normalizedDescription} />
          <meta name="twitter:description" content={normalizedDescription} />
        </>
      )}

      <meta name="theme-color" content="#F94AE7" />

      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" href="/favicon.png" />

      <meta property="og:locale" content={`${locale}_${locale.toUpperCase()}`} />

      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta name="twitter:image" content={image} />
          <meta name="twitter:card" content="summary_large_image" />
        </>
      )}

      <meta name="twitter:site" content="[TODO]" />
    </Head>
  );
}
