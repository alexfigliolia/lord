/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PropertyFragment
// ====================================================

export interface PropertyFragment_units {
  __typename: "unit";
  id: number;
  name: string;
}

export interface PropertyFragment {
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
  units: PropertyFragment_units[];
}
