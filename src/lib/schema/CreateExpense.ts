/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ExpenseCategory } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateExpense
// ====================================================

export interface CreateExpense_createExpense {
  __typename: "expense";
  amount: number;
  created_at: string;
}

export interface CreateExpense {
  createExpense: CreateExpense_createExpense;
}

export interface CreateExpenseVariables {
  property_id: number;
  category: ExpenseCategory;
  organization_id: number;
  description: string;
  amount: number;
}
