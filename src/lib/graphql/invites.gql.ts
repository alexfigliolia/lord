import { gql } from "graphql-request";
import { publicUserFragment } from "./user.gql";

export const inviteUser = gql`
  mutation InviteUser($name: String!, $email: String!, $organization_id: Int!, $role: UserRole!) {
    createInvite(name: $name, email: $email, organization_id: $organization_id, role: $role) {
      id
    }
  }
`;

export const findInvites = gql`
  mutation FindInvitations($email: String!) {
    invitations(email: $email) {
      name
      email
      role
      organization_id
    }
  }
`;

export const acceptInvite = gql`
  mutation AcceptInvite($invite_id: Int!, $name: String!, $email: String!, $password: String!, $organization_id: Int!, $role: UserRole!) {
    acceptInvite(
      invite_id: $invite_id, 
      name: $name, 
      email: $email, 
      password: $password, 
      organization_id: $organization_id, 
      role: $role
    ) {
      ${publicUserFragment}
    }
  }
`;
