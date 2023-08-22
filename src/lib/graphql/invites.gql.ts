import { gql } from "graphql-request";

export const inviteUser = gql`
  mutation InviteUser(
    $name: String!
    $email: String!
    $organization_id: Int!
    $organization_name: String!
    $role: UserRole!
  ) {
    createInvite(
      name: $name
      role: $role
      email: $email
      organization_id: $organization_id
      organization_name: $organization_name
    ) {
      id
    }
  }
`;

export const findInvitesByEmail = gql`
  query FindInvitations($email: String) {
    invites(email: $email) {
      id
      name
      email
      role
      organization_id
      organization_name
    }
  }
`;

export const acceptInvite = gql`
  mutation AcceptInvite(
    $invite_id: Int!
    $name: String!
    $email: String!
    $password: String!
    $organization_id: Int!
    $role: UserRole!
  ) {
    acceptInvite(
      invite_id: $invite_id
      name: $name
      email: $email
      password: $password
      organization_id: $organization_id
      role: $role
    ) {
      id
      name
      email
    }
  }
`;
