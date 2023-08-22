/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateLease
// ====================================================

export interface CreateLease_createLease_users {
  __typename: "user";
  id: number;
  name: string;
}

export interface CreateLease_createLease_payments {
  __typename: "payment";
  id: number;
  amount: number;
  created_at: string;
}

export interface CreateLease_createLease {
  __typename: "lease";
  id: number;
  unit_id: number;
  amount: number;
  organization_id: number;
  start_date: string;
  end_date: string;
  active: boolean;
  created_at: string;
  users: CreateLease_createLease_users[];
  payments: CreateLease_createLease_payments[];
}

export interface CreateLease {
  createLease: CreateLease_createLease;
}

export interface CreateLeaseVariables {
  unit_id: number;
  property_id: number;
  amount: number;
  organization_id: number;
  start_date: string;
  end_date: string;
  users: number[];
}
