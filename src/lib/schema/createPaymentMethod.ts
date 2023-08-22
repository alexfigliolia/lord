/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createPaymentMethod
// ====================================================

export interface createPaymentMethod_createPaymentMethod {
  __typename: "PaymentMethod";
  id: number;
  name: string;
  expiration: string;
}

export interface createPaymentMethod {
  createPaymentMethod: createPaymentMethod_createPaymentMethod;
}

export interface createPaymentMethodVariables {
  user_id: number;
  number: string;
  expiration: string;
  cvv: string;
}
