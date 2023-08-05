import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export enum ExpenseCategory {
  Hardware = 'hardware',
  Labor = 'labor',
  Management = 'management'
}

export enum IssueStatus {
  Complete = 'complete',
  Inprogress = 'inprogress',
  Open = 'open'
}

export enum IssueType {
  Complaint = 'complaint',
  Consultation = 'consultation',
  Fix = 'fix'
}

export type Mutation = {
  __typename?: 'Mutation';
  acceptInvite: User;
  createExpense: Array<Expense>;
  createInvite?: Maybe<Invite>;
  createIssue: Issue;
  createProperty?: Maybe<Property>;
  onboard?: Maybe<Authentication>;
  setIssueAssignment: Issue;
  setIssueStatus: Issue;
};


export type MutationAcceptInviteArgs = {
  email: Scalars['String']['input'];
  invite_id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  organization_id: Scalars['Int']['input'];
  password: Scalars['String']['input'];
  role: UserRole;
};


export type MutationCreateExpenseArgs = {
  amount: Scalars['Float']['input'];
  category: ExpenseCategory;
  description: Scalars['String']['input'];
  organization_id: Scalars['Int']['input'];
  property_id: Scalars['Int']['input'];
};


export type MutationCreateInviteArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  organization_id: Scalars['Int']['input'];
  organization_name: Scalars['String']['input'];
  role: UserRole;
};


export type MutationCreateIssueArgs = {
  assigned_id?: InputMaybe<Scalars['Int']['input']>;
  author: Scalars['String']['input'];
  description: Scalars['String']['input'];
  organization_id: Scalars['Int']['input'];
  property_id: Scalars['Int']['input'];
  status?: InputMaybe<IssueStatus>;
  title: Scalars['String']['input'];
  type: IssueType;
  unit_id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCreatePropertyArgs = {
  address_1: Scalars['String']['input'];
  address_2: Scalars['String']['input'];
  city: Scalars['String']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  organization_id: Scalars['Int']['input'];
  state: Scalars['String']['input'];
  zip_code: Scalars['String']['input'];
};


export type MutationOnboardArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  organization: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSetIssueAssignmentArgs = {
  issue_id: Scalars['Int']['input'];
  user_id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationSetIssueStatusArgs = {
  id: Scalars['Int']['input'];
  status: IssueStatus;
};

export type Query = {
  __typename?: 'Query';
  expenses: Array<Expense>;
  invites: Array<Invite>;
  issue: Issue;
  issueAttachment: IssueAttachment;
  issueAttachments: Array<IssueAttachment>;
  issues: Array<Issue>;
  lease?: Maybe<Lease>;
  leases?: Maybe<Array<Maybe<Lease>>>;
  login?: Maybe<Authentication>;
  logout?: Maybe<Scalars['Boolean']['output']>;
  organization: Organization;
  organizationAffiliations: Array<Organization>;
  organizations: Array<Organization>;
  organizationsUsers: Array<User>;
  payment?: Maybe<Payments>;
  payments: Array<Payments>;
  properties?: Maybe<Array<Maybe<Property>>>;
  property?: Maybe<Property>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  verifyToken?: Maybe<Authentication>;
};


export type QueryExpensesArgs = {
  category?: InputMaybe<ExpenseCategory>;
  organization_id?: InputMaybe<Scalars['Int']['input']>;
  property_id?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryInvitesArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  organization_id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryIssueArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryIssueAttachmentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryIssueAttachmentsArgs = {
  issue_id: Scalars['Int']['input'];
};


export type QueryIssuesArgs = {
  assigned_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  organization_id?: InputMaybe<Scalars['Int']['input']>;
  unit_id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLeaseArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLeasesArgs = {
  unit_id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryOrganizationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryOrganizationAffiliationsArgs = {
  user_id: Scalars['Int']['input'];
};


export type QueryOrganizationsArgs = {
  owner_id: Scalars['Int']['input'];
};


export type QueryOrganizationsUsersArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPaymentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPaymentsArgs = {
  lease_id: Scalars['Int']['input'];
};


export type QueryPropertiesArgs = {
  organization_id: Scalars['Int']['input'];
};


export type QueryPropertyArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUsersArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export enum UserRole {
  Employee = 'employee',
  Owner = 'owner',
  Resident = 'resident'
}

export type Authentication = {
  __typename?: 'authentication';
  user: User;
};

export type Expense = {
  __typename?: 'expense';
  amount: Scalars['Float']['output'];
  category: ExpenseCategory;
  created_at: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  organization_id: Scalars['Int']['output'];
  property_id: Scalars['Int']['output'];
};

export type Invite = {
  __typename?: 'invite';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  organization_id: Scalars['Int']['output'];
  organization_name: Scalars['String']['output'];
  role: UserRole;
};

export type Issue = {
  __typename?: 'issue';
  assigned?: Maybe<User>;
  assigned_id?: Maybe<Scalars['Int']['output']>;
  attachments: Array<IssueAttachment>;
  author: Scalars['String']['output'];
  created_at: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  organization_id: Scalars['Int']['output'];
  property_id: Scalars['Int']['output'];
  status: IssueStatus;
  title: Scalars['String']['output'];
  type: IssueType;
  unit_id?: Maybe<Scalars['Int']['output']>;
};

export type IssueAttachment = {
  __typename?: 'issueAttachment';
  created_at: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  image_link: Scalars['String']['output'];
  issue_id: Scalars['Int']['output'];
};

export type Lease = {
  __typename?: 'lease';
  active: Scalars['Boolean']['output'];
  created_at: Scalars['String']['output'];
  end_date: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  payments: Array<Payments>;
  start_date: Scalars['String']['output'];
  unit_id: Scalars['Int']['output'];
  users: Array<User>;
};

export type Organization = {
  __typename?: 'organization';
  id: Scalars['Int']['output'];
  issues: Array<Issue>;
  name: Scalars['String']['output'];
  owner_id: Scalars['Int']['output'];
  properties: Array<Property>;
  users: Array<User>;
};

export type Payments = {
  __typename?: 'payments';
  amount: Scalars['Float']['output'];
  created_at: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lease_id: Scalars['Int']['output'];
};

export type Property = {
  __typename?: 'property';
  address_1: Scalars['String']['output'];
  address_2: Scalars['String']['output'];
  city: Scalars['String']['output'];
  description: Scalars['String']['output'];
  expenses: Array<Expense>;
  id: Scalars['Int']['output'];
  images: Array<Scalars['String']['output']>;
  issues: Array<Issue>;
  name: Scalars['String']['output'];
  organization_id: Scalars['Int']['output'];
  state: Scalars['String']['output'];
  units: Array<Unit>;
  zip_code: Scalars['String']['output'];
};

export type Unit = {
  __typename?: 'unit';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  images: Array<Scalars['String']['output']>;
  issues: Array<Issue>;
  leases: Array<Lease>;
  name: Scalars['String']['output'];
  property_id: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'user';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: UserRole;
};

export type InviteUserMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  organization_id: Scalars['Int']['input'];
  organization_name: Scalars['String']['input'];
  role: UserRole;
}>;


export type InviteUserMutation = { __typename?: 'Mutation', createInvite?: { __typename?: 'invite', id: number } | null };

export type FindInvitationsQueryVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
}>;


export type FindInvitationsQuery = { __typename?: 'Query', invites: Array<{ __typename?: 'invite', id: number, name: string, email: string, role: UserRole, organization_id: number, organization_name: string }> };

export type AcceptInviteMutationVariables = Exact<{
  invite_id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  organization_id: Scalars['Int']['input'];
  role: UserRole;
}>;


export type AcceptInviteMutation = { __typename?: 'Mutation', acceptInvite: { __typename?: 'user', id: number, name: string, role: UserRole, email: string } };

export type OrganizationsByAffiliationQueryVariables = Exact<{
  user_id: Scalars['Int']['input'];
}>;


export type OrganizationsByAffiliationQuery = { __typename?: 'Query', organizationAffiliations: Array<{ __typename?: 'organization', id: number, name: string }> };

export type OrganizationByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type OrganizationByIdQuery = { __typename?: 'Query', organization: { __typename?: 'organization', id: number, name: string } };

export type OrganizationsUsersQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type OrganizationsUsersQuery = { __typename?: 'Query', organizationsUsers: Array<{ __typename?: 'user', id: number, name: string, role: UserRole, email: string }> };


export const InviteUserDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "InviteUser" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "name" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "email" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "organization_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "organization_name" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "role" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "UserRole" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "createInvite" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "name" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "name" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "role" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "role" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "email" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "email" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "organization_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "organization_id" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "organization_name" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "organization_name" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }] } }] } }] } as unknown as DocumentNode<InviteUserMutation, InviteUserMutationVariables>;
export const FindInvitationsDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "FindInvitations" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "email" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "invites" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "email" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "email" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "email" } }, { "kind": "Field", "name": { "kind": "Name", "value": "role" } }, { "kind": "Field", "name": { "kind": "Name", "value": "organization_id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "organization_name" } }] } }] } }] } as unknown as DocumentNode<FindInvitationsQuery, FindInvitationsQueryVariables>;
export const AcceptInviteDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "AcceptInvite" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "invite_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "name" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "email" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "password" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "organization_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "role" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "UserRole" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "acceptInvite" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "invite_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "invite_id" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "name" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "name" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "email" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "email" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "password" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "password" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "organization_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "organization_id" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "role" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "role" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "role" } }, { "kind": "Field", "name": { "kind": "Name", "value": "email" } }] } }] } }] } as unknown as DocumentNode<AcceptInviteMutation, AcceptInviteMutationVariables>;
export const OrganizationsByAffiliationDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "OrganizationsByAffiliation" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "user_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "organizationAffiliations" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "user_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "user_id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }] } }] } as unknown as DocumentNode<OrganizationsByAffiliationQuery, OrganizationsByAffiliationQueryVariables>;
export const OrganizationByIdDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "OrganizationByID" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "organization" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }] } }] } as unknown as DocumentNode<OrganizationByIdQuery, OrganizationByIdQueryVariables>;
export const OrganizationsUsersDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "OrganizationsUsers" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "organizationsUsers" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "role" } }, { "kind": "Field", "name": { "kind": "Name", "value": "email" } }] } }] } }] } as unknown as DocumentNode<OrganizationsUsersQuery, OrganizationsUsersQueryVariables>;