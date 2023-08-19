/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: OrganizationLessors
// ====================================================

export interface OrganizationLessors_organizationLessors {
  __typename: "user";
  id: number;
  name: string;
  role: UserRole;
  email: string;
}

export interface OrganizationLessors {
  organizationLessors: OrganizationLessors_organizationLessors[];
}

export interface OrganizationLessorsVariables {
  id: number;
}
