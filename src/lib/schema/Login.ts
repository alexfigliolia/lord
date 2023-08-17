/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: Login
// ====================================================

export interface Login_login_user {
  __typename: "user";
  id: number;
  name: string;
  role: UserRole;
  email: string;
}

export interface Login_login {
  __typename: "authentication";
  user: Login_login_user;
}

export interface Login {
  login: Login_login;
}

export interface LoginVariables {
  email: string;
  password: string;
}
