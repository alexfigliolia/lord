/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: OrganizationsUsers
// ====================================================

export interface OrganizationsUsers_organizationsUsers {
  __typename: "user";
  id: number;
  name: string;
  role: UserRole;
  email: string;
}

export interface OrganizationsUsers {
  organizationsUsers: OrganizationsUsers_organizationsUsers[];
}

export interface OrganizationsUsersVariables {
  id: number;
}
