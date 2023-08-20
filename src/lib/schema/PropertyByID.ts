/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { IssueStatus, IssueType } from "./globalTypes";

// ====================================================
// GraphQL query operation: PropertyByID
// ====================================================

export interface PropertyByID_propertyUI_issues_assigned {
  __typename: "user";
  id: number;
  name: string;
}

export interface PropertyByID_propertyUI_issues {
  __typename: "issue";
  id: number;
  status: IssueStatus;
  type: IssueType;
  author: string;
  title: string;
  unit_id: number | null;
  property_id: number;
  description: string;
  assigned: PropertyByID_propertyUI_issues_assigned | null;
  created_at: string;
}

export interface PropertyByID_propertyUI_units_leases {
  __typename: "lease";
  id: number;
  amount: number;
  unit_id: number;
  start_date: string;
  end_date: string;
  active: boolean;
  created_at: string;
}

export interface PropertyByID_propertyUI_units {
  __typename: "unit";
  id: number;
  name: string;
  description: string;
  leases: PropertyByID_propertyUI_units_leases[];
}

export interface PropertyByID_propertyUI_expenses {
  __typename: "expense";
  amount: number;
  created_at: string;
}

export interface PropertyByID_propertyUI_payments {
  __typename: "payment";
  amount: number;
  created_at: string;
}

export interface PropertyByID_propertyUI {
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
  issues: PropertyByID_propertyUI_issues[];
  units: PropertyByID_propertyUI_units[];
  expenses: PropertyByID_propertyUI_expenses[];
  payments: PropertyByID_propertyUI_payments[];
}

export interface PropertyByID {
  propertyUI: PropertyByID_propertyUI;
}

export interface PropertyByIDVariables {
  id: number;
}
