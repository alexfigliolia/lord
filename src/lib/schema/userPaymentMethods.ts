/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userPaymentMethods
// ====================================================

export interface userPaymentMethods_userPaymentMethods_payment_methods {
  __typename: "PaymentMethod";
  id: number;
  name: string;
  expiration: string;
}

export interface userPaymentMethods_userPaymentMethods_linked_bank_accounts {
  __typename: "LinkedBankAccount";
  id: number;
  name: string;
}

export interface userPaymentMethods_userPaymentMethods {
  __typename: "UserPaymentMethods";
  payment_methods: userPaymentMethods_userPaymentMethods_payment_methods[];
  linked_bank_accounts: userPaymentMethods_userPaymentMethods_linked_bank_accounts[];
}

export interface userPaymentMethods {
  userPaymentMethods: userPaymentMethods_userPaymentMethods;
}

export interface userPaymentMethodsVariables {
  user_id: number;
}
