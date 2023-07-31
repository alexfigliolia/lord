import { gql } from "graphql-request";
import { publicUsersFragment } from "./user.gql";
import { issueFragment } from "./issues.gql";
import { propertiesFragment } from "./properties.gql";

export const organizationsByOwner = gql`
  query OrganizationsByOwner($owner_id: Int!) {
    organizations(owner_id: $owner_id) {
      id
      name
      ${publicUsersFragment}
      ${issueFragment}
      ${propertiesFragment}
    }
  }
`;
