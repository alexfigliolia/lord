/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: FindInvitations
// ====================================================

export interface FindInvitations_invites {
  __typename: "invite";
  id: number;
  name: string;
  email: string;
  role: UserRole;
  organization_id: number;
  organization_name: string;
}

export interface FindInvitations {
  invites: FindInvitations_invites[];
}

export interface FindInvitationsVariables {
  email?: string | null;
}
