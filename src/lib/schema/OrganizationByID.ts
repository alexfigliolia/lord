/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole, IssueStatus, IssueType } from "./globalTypes";

// ====================================================
// GraphQL query operation: OrganizationByID
// ====================================================

export interface OrganizationByID_organization_users {
  __typename: "user";
  id: number;
  name: string;
  role: UserRole;
  email: string;
}

export interface OrganizationByID_organization_issues_assigned {
  __typename: "user";
  id: number;
  name: string;
}

export interface OrganizationByID_organization_issues {
  __typename: "issue";
  id: number;
  status: IssueStatus;
  type: IssueType;
  author: string;
  title: string;
  unit_id: number | null;
  property_id: number;
  description: string;
  assigned: OrganizationByID_organization_issues_assigned | null;
  created_at: string;
}

export interface OrganizationByID_organization_properties {
  __typename: "property";
  id: number;
  name: string;
  description: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  zip_code: string;
  images: string[];
}

export interface OrganizationByID_organization {
  __typename: "organization";
  id: number;
  name: string;
  users: OrganizationByID_organization_users[];
  issues: OrganizationByID_organization_issues[];
  properties: OrganizationByID_organization_properties[];
}

export interface OrganizationByID {
  organization: OrganizationByID_organization;
}

export interface OrganizationByIDVariables {
  id: number;
}
