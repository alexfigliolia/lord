/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL fragment: UserFragment
// ====================================================

export interface UserFragment {
  __typename: "user";
  id: number;
  name: string;
  role: UserRole;
  email: string;
}
