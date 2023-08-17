/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: onBoard
// ====================================================

export interface onBoard_onboard_user {
  __typename: "user";
  id: number;
  name: string;
  role: UserRole;
  email: string;
}

export interface onBoard_onboard {
  __typename: "authentication";
  user: onBoard_onboard_user;
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
