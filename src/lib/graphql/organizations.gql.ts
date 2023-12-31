import { gql } from "graphql-request";
import { UserFragment } from "./user.gql";
import { PropertyFragment } from "./properties.gql";
import { IssueFragment } from "./issues.gql";
import { PaymentFragment } from "./payment.gql";
import { ExpenseFragment } from "./expense.gql";

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
  ${PaymentFragment}
  ${ExpenseFragment}
  query OrganizationByID($id: Int!, $user_id: Int!) {
    organization(id: $id, user_id: $user_id) {
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
        payments {
          ...PaymentFragment
        }
        expenses {
          ...ExpenseFragment
        }
        issues {
          ...IssueFragment
        }
        units {
          id
          name
          description
          leases {
            id
            amount
            unit_id
            start_date
            end_date
            active
            created_at
          }
        }
      }
      payments {
        ...PaymentFragment
      }
      expenses {
        ...ExpenseFragment
      }
    }
  }
`;

export const queryUsersByOrgID = gql`
  query OrganizationsUsers($id: Int!) {
    organizationsUsers(id: $id) {
      id
      name
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
