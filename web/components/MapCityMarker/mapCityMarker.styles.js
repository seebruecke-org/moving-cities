import { css } from '@emotion/react';

export const container = css`
    align-items: center;
    display: flex;
    flex-direction: column;
`

export const icon = css`
    filter: drop-shadow(0 0 0.2rem var(--color-yellow));
    height: 2rem;
    width: 2rem;
`;

export const name = css`
    color: var(--color-blue);
    font-family: var(--font-sans);
    font-size: 1.1rem;
`;
