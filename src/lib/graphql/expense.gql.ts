import { gql } from "graphql-request";

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
      id
    }
  }
`;
