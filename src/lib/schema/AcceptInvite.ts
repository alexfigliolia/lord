/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: AcceptInvite
// ====================================================

export interface AcceptInvite_acceptInvite {
  __typename: "user";
  id: number;
  name: string;
  role: UserRole;
  email: string;
}

export interface AcceptInvite {
  acceptInvite: AcceptInvite_acceptInvite;
}

export interface AcceptInviteVariables {
  invite_id: number;
  name: string;
  email: string;
  password: string;
  organization_id: number;
  role: UserRole;
}
