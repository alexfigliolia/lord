import { gql } from "graphql-request";

export const organizationsByOwner = gql`
  query OrganizationsByOwner($owner_id: Int!, $follow_all: Boolean) {
    organizations(owner_id: $owner_id, follow_all: $follow_all) {
      id
      name
      users {
        id
        name
        role
        email
      }
      issues {
        id
        status
        type
        author
        title
        description
        assigned_id
        created_at
      }
      properties {
        id
        name
        description
        address_1
        address_2
        city
        state
        zip_code
        images
      }
    }
  }
`;
