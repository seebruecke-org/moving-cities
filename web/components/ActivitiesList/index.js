export { default } from './ActivitiesList';

export const FRAGMENT = `
    activities {
        title

        access_social_rights,
        improvement_resident_security,
        reception_refugees,
        political_participation,
        intercultural_inclusion,
        structural_capacities

        city {
            name
            slug

            country {
                slug
            }
        }
    }
`;
