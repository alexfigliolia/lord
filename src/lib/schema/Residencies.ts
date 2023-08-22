/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Residencies
// ====================================================

export interface Residencies_residencies_property {
  __typename: "entity";
  id: number;
  name: string;
}

export interface Residencies_residencies_unit {
  __typename: "entity";
  id: number;
  name: string;
}

export interface Residencies_residencies_payments {
  __typename: "transaction";
  id: number;
  amount: number;
}

export interface Residencies_residencies {
  __typename: "residence";
  id: number;
  amount: number;
  start_date: string;
  end_date: string;
  organization_id: number;
  property: Residencies_residencies_property;
  unit: Residencies_residencies_unit;
  payments: Residencies_residencies_payments[];
}

export interface Residencies {
  residencies: Residencies_residencies[];
}

export interface ResidenciesVariables {
  user_id: number;
}
