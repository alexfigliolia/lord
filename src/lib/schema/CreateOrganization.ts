/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateOrganization
// ====================================================

export interface CreateOrganization_createOrganization__count {
  __typename: "orgStats";
  issues: number;
  properties: number;
  users: number;
}

export interface CreateOrganization_createOrganization {
  __typename: "organizationStats";
  id: number;
  name: string;
  _count: CreateOrganization_createOrganization__count;
}

export interface CreateOrganization {
  createOrganization: CreateOrganization_createOrganization;
}

export interface CreateOrganizationVariables {
  name: string;
  owner_id: number;
}
