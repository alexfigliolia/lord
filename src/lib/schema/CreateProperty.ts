/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { IssueStatus, IssueType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateProperty
// ====================================================

export interface CreateProperty_createProperty_issues_assigned {
  __typename: "user";
  id: number;
  name: string;
}

export interface CreateProperty_createProperty_issues {
  __typename: "issue";
  id: number;
  status: IssueStatus;
  type: IssueType;
  author: string;
  title: string;
  unit_id: number | null;
  property_id: number;
  description: string;
  assigned: CreateProperty_createProperty_issues_assigned | null;
  created_at: string;
}

export interface CreateProperty_createProperty_units_leases {
  __typename: "lease";
  id: number;
  amount: number;
  unit_id: number;
  start_date: string;
  end_date: string;
  active: boolean;
  created_at: string;
}

export interface CreateProperty_createProperty_units {
  __typename: "unit";
  id: number;
  name: string;
  description: string;
  leases: CreateProperty_createProperty_units_leases[];
}

export interface CreateProperty_createProperty {
  __typename: "property";
  id: number;
  name: string;
  organization_id: number;
  description: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  zip_code: string;
  images: string[];
  issues: CreateProperty_createProperty_issues[];
  units: CreateProperty_createProperty_units[];
}

export interface CreateProperty {
  createProperty: CreateProperty_createProperty;
}

export interface CreatePropertyVariables {
  name: string;
  organization_id: number;
  description: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  zip_code: string;
}
