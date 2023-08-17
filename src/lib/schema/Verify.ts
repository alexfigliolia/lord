/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: Verify
// ====================================================

export interface Verify_verifyToken_user {
  __typename: "user";
  id: number;
  name: string;
  role: UserRole;
  email: string;
}

export interface Verify_verifyToken {
  __typename: "authentication";
  user: Verify_verifyToken_user;
}

export interface Verify {
  verifyToken: Verify_verifyToken;
}
