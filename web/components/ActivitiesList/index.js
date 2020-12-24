export { default } from './ActivitiesList';

export const FRAGMENT = `
    activities {
        title

        city {
            name
            slug

            country {
                slug
            }
        }
    }
`;
