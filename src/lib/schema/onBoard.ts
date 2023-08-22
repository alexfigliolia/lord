/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: onBoard
// ====================================================

export interface onBoard_onboard {
  __typename: "user";
  id: number;
  name: string;
  email: string;
}

export interface onBoard {
  onboard: onBoard_onboard;
}

export interface onBoardVariables {
  name: string;
  email: string;
  password: string;
  organization: string;
}
