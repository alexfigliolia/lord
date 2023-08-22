/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { IssueStatus, IssueType } from "./globalTypes";

// ====================================================
// GraphQL query operation: OrganizationByID
// ====================================================

export interface OrganizationByID_organization_users {
  __typename: "user";
  id: number;
  name: string;
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

export interface OrganizationByID_organization_properties_units_leases {
  __typename: "lease";
  id: number;
  amount: number;
  unit_id: number;
  start_date: string;
  end_date: string;
  active: boolean;
  created_at: string;
}

export interface OrganizationByID_organization_properties_units {
  __typename: "unit";
  id: number;
  name: string;
  description: string;
  leases: OrganizationByID_organization_properties_units_leases[];
}

export interface OrganizationByID_organization_properties_payments {
  __typename: "payment";
  amount: number;
  created_at: string;
}

export interface OrganizationByID_organization_properties_expenses {
  __typename: "expense";
  amount: number;
  created_at: string;
}

export interface OrganizationByID_organization_properties_issues_assigned {
  __typename: "user";
  id: number;
  name: string;
}

export interface OrganizationByID_organization_properties_issues {
  __typename: "issue";
  id: number;
  status: IssueStatus;
  type: IssueType;
  author: string;
  title: string;
  unit_id: number | null;
  property_id: number;
  description: string;
  assigned: OrganizationByID_organization_properties_issues_assigned | null;
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
  units: OrganizationByID_organization_properties_units[];
  payments: OrganizationByID_organization_properties_payments[];
  expenses: OrganizationByID_organization_properties_expenses[];
  issues: OrganizationByID_organization_properties_issues[];
}

export interface OrganizationByID_organization_payments {
  __typename: "payment";
  amount: number;
  created_at: string;
}

export interface OrganizationByID_organization_expenses {
  __typename: "expense";
  amount: number;
  created_at: string;
}

export interface OrganizationByID_organization {
  __typename: "organization";
  id: number;
  name: string;
  users: OrganizationByID_organization_users[];
  issues: OrganizationByID_organization_issues[];
  properties: OrganizationByID_organization_properties[];
  payments: OrganizationByID_organization_payments[];
  expenses: OrganizationByID_organization_expenses[];
}

export interface OrganizationByID {
  organization: OrganizationByID_organization;
}

export interface OrganizationByIDVariables {
  id: number;
  user_id: number;
}
