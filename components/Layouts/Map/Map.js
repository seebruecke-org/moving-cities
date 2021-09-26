import { useTranslation } from 'next-i18next';

import FloatingCta from '@/components/FloatingCta';
import MapboxMap from '@/components/MapboxMap';

import useMapReducer from '@/lib/stores/map';
import { useEffect } from 'react';

export default function LayoutMap({ children }) {
  const { t } = useTranslation('city');
  const { t: tSlugs } = useTranslation('slugs');

  const [state] = useMapReducer();

  useEffect(() => {
    console.log('state update', state);
  }, [JSON.stringify(state)])

  return <div className="flex flex-col md:flex-row md:h-full">
    {children}

    <MapboxMap bounds={state.bounds}>{state.markers}</MapboxMap>

    <FloatingCta target={`/${tSlugs('map_cta')}`} label={t('addCity')} />
  </div>
}
