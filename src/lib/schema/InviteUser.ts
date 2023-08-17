/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: InviteUser
// ====================================================

export interface InviteUser_createInvite {
  __typename: "invite";
  id: number;
}

export interface InviteUser {
  createInvite: InviteUser_createInvite | null;
}

export interface InviteUserVariables {
  name: string;
  email: string;
  organization_id: number;
  organization_name: string;
  role: UserRole;
}
