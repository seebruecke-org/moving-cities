import { TAILWIND_MQ_MD } from '@/lib/constants';

export function renderMap(windowWidth) {
  return typeof window !== 'undefined' && windowWidth > TAILWIND_MQ_MD;
}
