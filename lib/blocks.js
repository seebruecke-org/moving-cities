export const BLOCK_PREFIX = 'ComponentBlocks';

import follow from '@/components/Blocks/Follow/block';
import intro from '@/components/Blocks/Intro/block';
import quote from '@/components/Blocks/Quote/block';
import media from '@/components/Blocks/Media/block';
import networksSummary, {
  sideload as sideloadNetworksSummary
} from '@/components/Blocks/NetworksSummary/block';
import richtext from '@/components/Blocks/Richtext/block';
import section from '@/components/Blocks/Section/block';

const BLOCKS = {
  Follow: follow,
  Intro: intro,
  Quote: quote,
  Richtext: richtext,
  Section: section,
  Media: media,
  NetworksSummary: networksSummary
};

const SIDELOAD_BLOCKS = {
  NetworksSummary: sideloadNetworksSummary
};

export function getBlockFragments(fragments) {
  return fragments
    .map(
      (fragment) => `
    ... on ${BLOCK_PREFIX}${fragment} {
      ${BLOCKS[fragment]}
    }
  `
    )
    .join('\n\n');
}

export async function sideloadBlockData(blocks = [], context, locale) {
  return await Promise.all(
    blocks.map(async ({ __typename, ...data }) => {
      const shortName = __typename.replace(BLOCK_PREFIX, '');

      if (!SIDELOAD_BLOCKS?.[shortName]) {
        return {
          __typename,
          ...data
        };
      }

      const sideloadedData = await SIDELOAD_BLOCKS[shortName](data, context, locale);

      return {
        __typename,
        ...data,
        ...sideloadedData
      };
    })
  );
}
