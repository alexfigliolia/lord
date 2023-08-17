/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { IssueStatus, IssueType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateIssue
// ====================================================

export interface CreateIssue_createIssue_assigned {
  __typename: "user";
  id: number;
  name: string;
}

export interface CreateIssue_createIssue {
  __typename: "issue";
  id: number;
  status: IssueStatus;
  type: IssueType;
  author: string;
  title: string;
  unit_id: number | null;
  property_id: number;
  description: string;
  created_at: string;
  assigned: CreateIssue_createIssue_assigned | null;
}

export interface CreateIssue {
  createIssue: CreateIssue_createIssue;
}

export interface CreateIssueVariables {
  title: string;
  author: string;
  description: string;
  property_id: number;
  unit_id?: number | null;
  organization_id: number;
  assigned_id?: number | null;
  status?: IssueStatus | null;
  type: IssueType;
}
