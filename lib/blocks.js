export const BLOCK_PREFIX = 'ComponentBlocks';

import intro from '@/components/Blocks/Intro/block';
import quote from '@/components/Blocks/Quote/block';
import networksSummary from '@/components/Blocks/NetworksSummary/block';
import richtext from '@/components/Blocks/Richtext/block';
import section from '@/components/Blocks/Section/block';

const BLOCKS = {
  Intro: intro,
  Quote: quote,
  Richtext: richtext,
  Section: section,
  NetworksSummary: networksSummary
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
