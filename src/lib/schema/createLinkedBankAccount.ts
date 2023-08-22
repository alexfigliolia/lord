/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createLinkedBankAccount
// ====================================================

export interface createLinkedBankAccount_createLinkedBankAccount {
  __typename: "LinkedBankAccount";
  id: number;
  name: string;
}

export interface createLinkedBankAccount {
  createLinkedBankAccount: createLinkedBankAccount_createLinkedBankAccount;
}

export interface createLinkedBankAccountVariables {
  user_id: number;
  routing: string;
  account_number: string;
  name: string;
}
