/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UnitFragment
// ====================================================

export interface UnitFragment_leases {
  __typename: "lease";
  id: number;
  amount: number;
  unit_id: number;
  start_date: string;
  end_date: string;
  active: boolean;
  created_at: string;
}

export interface UnitFragment {
  __typename: "unit";
  id: number;
  name: string;
  description: string;
  leases: UnitFragment_leases[];
}
