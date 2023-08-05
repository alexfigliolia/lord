import { gql } from "graphql-request";
import { publicUsersFragment } from "./user.gql";
import { issuesFragment } from "./issues.gql";
import { propertiesFragment } from "./properties.gql";

export const organizationsByAffiliation = gql`
  query OrganizationsByAffiliation($user_id: Int!) {
    organizationStats(id: $user_id) {
      id
      name
      _count {
        issues
        properties
        users
      }
    }
  }
`;

export const organizationByID = gql`
  query OrganizationByID($id: Int!) {
    organization(id: $id) {
      id
      name
      ${publicUsersFragment}
      ${issuesFragment}
      ${propertiesFragment}
    }
  }
`;

export const queryUsersByOrgID = gql`
  query OrganizationsUsers($id: Int!) {
    organizationsUsers(id: $id) {
      id
      name
      role
      email
    }
  }
`;
