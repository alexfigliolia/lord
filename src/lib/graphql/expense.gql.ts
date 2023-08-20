import { gql } from "graphql-request";

export const ExpenseFragment = gql`
  fragment ExpenseFragment on expense {
    amount
    created_at
  }
`;

export const createExpenseMutation = gql`
  mutation CreateExpense(
    $property_id: Int!
    $category: ExpenseCategory!
    $organization_id: Int!
    $description: String!
    $amount: Float!
  ) {
    createExpense(
      property_id: $property_id
      category: $category
      organization_id: $organization_id
      description: $description
      amount: $amount
    ) {
      amount
      created_at
    }
  }
`;
