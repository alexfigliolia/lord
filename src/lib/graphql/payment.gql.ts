import { gql } from "graphql-request";

export const PaymentFragment = gql`
  fragment PaymentFragment on payment {
    amount
    created_at
  }
`;

export const createPayment = gql`
  mutation CreatePayment(
    $unit_id: Int!
    $property_id: Int!
    $description: String!
    $organization_id: Int!
    $payment_method_id: Int!
    $amount: Float!
    $user_id: Int!
  ) {
    createPayment(
      unit_id: $unit_id
      property_id: $property_id
      organization_id: $organization_id
      description: $description
      amount: $amount
      payment_method_id: $payment_method_id
      user_id: $user_id
    ) {
      id
      amount
    }
  }
`;
