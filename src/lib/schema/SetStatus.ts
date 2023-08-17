/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { IssueStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SetStatus
// ====================================================

export interface SetStatus_setIssueStatus {
  __typename: "issue";
  id: number;
}

export interface SetStatus {
  setIssueStatus: SetStatus_setIssueStatus;
}

export interface SetStatusVariables {
  id: number;
  status: IssueStatus;
}
