export default `
  teamMembers: team_member {
    name
    position
    image {
      data {
        attributes {
          alternativeText
          url
        }
      }
    }
    text
    email
    phone
  }
`;
