import { ClassNames } from '@emotion/react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion';

import Blocks from '../Blocks';

import * as styles from './chapterList.styles';

export default function ChapterList({ chapter = [] }) {
  return (
    <ClassNames>
      {({ css, cx }) => (
        <Accordion
          className={css`
            ${styles.accordion}
          `}>
          {chapter.map(({ title, blocks = [] }) => (
            <AccordionItem
              className={css`
                ${styles.accordionItem}
              `}>
              <AccordionItemHeading>
                <AccordionItemButton
                  className={css`
                    ${styles.accordionButton}
                  `}>
                  <svg
                    width="34"
                    height="33"
                    viewBox="0 0 34 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    css={styles.accordionButtonIcon}>
                    <path
                      d="M15.95 26.24h1.92v-9.01h9.02V15.3h-9.02V6.29h-1.92v9.02H6.94v1.92h9.01v9.01zM18.42 30.61l.16 1.92a16.38 16.38 0 0014.6-14.6l-1.92-.16a14.45 14.45 0 01-12.84 12.84zM2.56 17.77l-1.9.16a16.38 16.38 0 0014.48 14.59l.16-1.92A14.45 14.45 0 012.56 17.77zM15.31 1.92L15.15.01A16.38 16.38 0 00.66 14.5l1.92.16c.74-6.68 6.05-12 12.73-12.74zM31.25 14.65l1.92-.16A16.38 16.38 0 0018.57 0l-.16 1.91c6.73.7 12.1 6.04 12.84 12.74z"
                      fill="currentColor"
                    />
                  </svg>

                  {title}
                </AccordionItemButton>
              </AccordionItemHeading>

              <AccordionItemPanel
                className={css`
                  ${styles.accordionPanel}
                `}>
                <Blocks blocks={blocks} />
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </ClassNames>
  );
}
