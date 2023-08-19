import { gql } from "graphql-request";

export const createPayment = gql`
  mutation CreatePayment(
    $unit_id: Int!
    $property_id: Int!
    $description: String!
    $amount: Float!
    $user_id: Int!
  ) {
    createPayment(
      unit_id: $unit_id
      property_id: $property_id
      description: $description
      amount: $amount
      user_id: $user_id
    ) {
      id
    }
  }
`;
