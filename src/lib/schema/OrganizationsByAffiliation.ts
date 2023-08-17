/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OrganizationsByAffiliation
// ====================================================

export interface OrganizationsByAffiliation_organizationStats__count {
  __typename: "orgStats";
  issues: number;
  properties: number;
  users: number;
}

export interface OrganizationsByAffiliation_organizationStats {
  __typename: "organizationStats";
  id: number;
  name: string;
  _count: OrganizationsByAffiliation_organizationStats__count;
}

export interface OrganizationsByAffiliation {
  organizationStats: OrganizationsByAffiliation_organizationStats[];
}

export interface OrganizationsByAffiliationVariables {
  user_id: number;
}
