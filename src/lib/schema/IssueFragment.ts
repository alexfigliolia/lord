/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { IssueStatus, IssueType } from "./globalTypes";

// ====================================================
// GraphQL fragment: IssueFragment
// ====================================================

export interface IssueFragment_assigned {
  __typename: "user";
  id: number;
  name: string;
}

export interface IssueFragment {
  __typename: "issue";
  id: number;
  status: IssueStatus;
  type: IssueType;
  author: string;
  title: string;
  unit_id: number | null;
  property_id: number;
  description: string;
  assigned: IssueFragment_assigned | null;
  created_at: string;
}
