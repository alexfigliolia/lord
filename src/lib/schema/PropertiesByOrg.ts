/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PropertiesByOrg
// ====================================================

export interface PropertiesByOrg_properties {
  __typename: "property";
  id: number;
  name: string;
  description: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  zip_code: string;
}

export interface PropertiesByOrg {
  properties: PropertiesByOrg_properties[];
}

export interface PropertiesByOrgVariables {
  id: number;
}
