/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AssignIssue
// ====================================================

export interface AssignIssue_setIssueAssignment {
  __typename: "issue";
  id: number;
}

export interface AssignIssue {
  setIssueAssignment: AssignIssue_setIssueAssignment;
}

export interface AssignIssueVariables {
  issue_id: number;
  user_id?: number | null;
}
