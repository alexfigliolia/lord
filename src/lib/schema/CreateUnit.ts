/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateUnit
// ====================================================

export interface CreateUnit_createUnit_leases {
  __typename: "lease";
  id: number;
  amount: number;
  unit_id: number;
  start_date: string;
  end_date: string;
  active: boolean;
  created_at: string;
}

export interface CreateUnit_createUnit {
  __typename: "unit";
  id: number;
  name: string;
  description: string;
  leases: CreateUnit_createUnit_leases[];
}

export interface CreateUnit {
  createUnit: CreateUnit_createUnit;
}

export interface CreateUnitVariables {
  name: string;
  description: string;
  property_id: number;
}
