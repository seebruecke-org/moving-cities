import { css } from '@emotion/react';

import boxShadow from '../../lib/styles/box-shadow';

export const resetPopup = css`
    .mapboxgl-popup-content {
        background: transparent;
        border-radius: 0;
        padding: 0;
    }

    .mapboxgl-popup-tip {
        display: none;
    }
`

export const container = css`
    ${boxShadow()}

    background: white;
    border-radius: 2rem;
    color: var(--color-blue);
    font-family: var(--font-sans);
    max-width: 30rem;
    padding: 3rem 2rem;
`;

export const title = css`
    font-size: 2.4rem;
    margin-top: 0;
`;

export const intro = css`
    font-size: 1.3rem;
`;

export const cta = css`
    border: 1px solid var(--color-blue);
    border-radius: 2rem;
    cursor: pointer;
    display: inline-block;
    margin-top: 1rem;
    padding: 0.35rem 1rem;

    :hover,
    :focus {
        background-color: var(--color-purple);
    }
`;
