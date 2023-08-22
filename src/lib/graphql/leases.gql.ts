import { gql } from "graphql-request";
import { PaymentFragment } from "./payment.gql";

export const createLease = gql`
  ${PaymentFragment}
  mutation CreateLease(
    $unit_id: Int!
    $property_id: Int!
    $amount: Float!
    $organization_id: Int!
    $start_date: String!
    $end_date: String!
    $users: [Int!]!
  ) {
    createLease(
      unit_id: $unit_id
      property_id: $property_id
      amount: $amount
      organization_id: $organization_id
      start_date: $start_date
      end_date: $end_date
      users: $users
    ) {
      id
      unit_id
      amount
      organization_id
      start_date
      end_date
      active
      created_at
      users {
        id
        name
      }
      payments {
        id
        ...PaymentFragment
      }
    }
  }
`;
