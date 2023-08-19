import { gql } from "graphql-request";
import { UserFragment } from "./user.gql";
import { PropertyFragment } from "./properties.gql";
import { IssueFragment } from "./issues.gql";

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
  ${UserFragment}
  ${IssueFragment}
  ${PropertyFragment}
  query OrganizationByID($id: Int!) {
    organization(id: $id) {
      id
      name
      users {
        ...UserFragment
      }
      issues {
        ...IssueFragment
      }
      properties {
        ...PropertyFragment
      }
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

export const createOrganization = gql`
  mutation CreateOrganization($name: String!, $owner_id: Int!) {
    createOrganization(name: $name, owner_id: $owner_id) {
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

export const organizationLessors = gql`
  ${UserFragment}
  query OrganizationLessors($id: Int!) {
    organizationLessors(id: $id) {
      ...UserFragment
    }
  }
`;
