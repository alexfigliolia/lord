import { gql } from "graphql-request";
import { UserFragment } from "./user.gql";

export const logoutQuery = gql`
  query Logout {
    logout
  }
`;

export const loginQuery = gql`
  ${UserFragment}
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        ...UserFragment
      }
    }
  }
`;

export const verifyQuery = gql`
  ${UserFragment}
  query Verify {
    verifyToken {
      user {
        ...UserFragment
      }
    }
  }
`;

export const onboardQuery = gql`
  ${UserFragment}
  mutation onBoard($name: String!, $email: String!, $password: String!, $organization: String!) {
    onboard(name: $name, email: $email, password: $password, organization: $organization) {
      user {
        ...UserFragment
      }
    }
  }
`;
