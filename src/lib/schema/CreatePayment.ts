/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreatePayment
// ====================================================

export interface CreatePayment_createPayment {
  __typename: "payment";
  id: number;
  amount: number;
}

export interface CreatePayment {
  createPayment: CreatePayment_createPayment;
}

export interface CreatePaymentVariables {
  unit_id: number;
  property_id: number;
  description: string;
  organization_id: number;
  payment_method_id: number;
  amount: number;
  user_id: number;
}
