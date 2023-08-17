/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { IssueStatus, IssueType } from "./globalTypes";

// ====================================================
// GraphQL fragment: IssuesWithPropertyFragment
// ====================================================

export interface IssuesWithPropertyFragment_assigned {
  __typename: "user";
  id: number;
  name: string;
}

export interface IssuesWithPropertyFragment_property {
  __typename: "issueProperty";
  id: number;
  name: string;
}

export interface IssuesWithPropertyFragment {
  __typename: "issue";
  id: number;
  status: IssueStatus;
  type: IssueType;
  author: string;
  title: string;
  unit_id: number | null;
  property_id: number;
  description: string;
  assigned_id: number | null;
  assigned: IssuesWithPropertyFragment_assigned | null;
  property: IssuesWithPropertyFragment_property;
  created_at: string;
}
