import { gql } from "graphql-request";

export const UserPaymentMethodsQuery = gql`
  query userPaymentMethods($user_id: Int!) {
    userPaymentMethods(user_id: $user_id) {
      payment_methods {
        id
        name
        expiration
      }
      linked_bank_accounts {
        id
        name
      }
    }
  }
`;

export const CreateLinkedBankAccount = gql`
  mutation createLinkedBankAccount(
    $user_id: Int!
    $routing: String!
    $account_number: String!
    $name: String!
  ) {
    createLinkedBankAccount(
      user_id: $user_id
      routing: $routing
      account_number: $account_number
      name: $name
    ) {
      id
      name
    }
  }
`;

export const CreatePaymentMethod = gql`
  mutation createPaymentMethod(
    $user_id: Int!
    $number: String!
    $expiration: String!
    $cvv: String!
  ) {
    createPaymentMethod(user_id: $user_id, number: $number, expiration: $expiration, cvv: $cvv) {
      id
      name
      expiration
    }
  }
`;
