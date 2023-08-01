import { gql } from "graphql-request";
import { publicUsersFragment } from "./user.gql";
import { issueFragment } from "./issues.gql";
import { propertiesFragment } from "./properties.gql";

export const organizationsByAffiliation = gql`
  query OrganizationsByAffiliation($user_id: Int!) {
    organizationAffiliations(user_id: $user_id) {
      id
      name
      ${publicUsersFragment}
      ${issueFragment}
      ${propertiesFragment}
    }
  }
`;
