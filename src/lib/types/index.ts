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

export type Mutation = {
  __typename?: 'Mutation';
  createProperty?: Maybe<Property>;
  onboard?: Maybe<Authentication>;
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

export type Query = {
  __typename?: 'Query';
  issue?: Maybe<Issue>;
  issues?: Maybe<Array<Maybe<Issue>>>;
  lease?: Maybe<Lease>;
  leases?: Maybe<Array<Maybe<Lease>>>;
  login?: Maybe<Authentication>;
  logout?: Maybe<Scalars['Boolean']['output']>;
  organization?: Maybe<Organization>;
  organizations?: Maybe<Array<Maybe<Organization>>>;
  properties?: Maybe<Array<Maybe<Property>>>;
  property?: Maybe<Property>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  verifyToken?: Maybe<Authentication>;
};


export type QueryIssueArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
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
  follow_all?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['Int']['input'];
};


export type QueryOrganizationsArgs = {
  follow_all?: InputMaybe<Scalars['Boolean']['input']>;
  owner_id: Scalars['Int']['input'];
};


export type QueryPropertiesArgs = {
  organization_id: Scalars['Int']['input'];
};


export type QueryPropertyArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUsersArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Authentication = {
  __typename?: 'authentication';
  user: User;
};

export type Issue = {
  __typename?: 'issue';
  assigned_id?: Maybe<Scalars['Int']['output']>;
  author: Scalars['String']['output'];
  created_at: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  organization_id: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  unit_id?: Maybe<Scalars['Int']['output']>;
};

export type Lease = {
  __typename?: 'lease';
  active: Scalars['Boolean']['output'];
  created_at: Scalars['String']['output'];
  end_date: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  start_date: Scalars['String']['output'];
  unit_id: Scalars['Int']['output'];
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

export type Property = {
  __typename?: 'property';
  address_1: Scalars['String']['output'];
  address_2: Scalars['String']['output'];
  city: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  images: Array<Scalars['String']['output']>;
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
  role: Scalars['String']['output'];
};

export type OrganizationsByOwnerQueryVariables = Exact<{
  owner_id: Scalars['Int']['input'];
  follow_all?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type OrganizationsByOwnerQuery = { __typename?: 'Query', organizations?: Array<{ __typename?: 'organization', id: number, name: string, users: Array<{ __typename?: 'user', id: number, name: string, role: string, email: string }>, issues: Array<{ __typename?: 'issue', id: number, status: string, type: string, author: string, title: string, description: string, assigned_id?: number | null, created_at: string }>, properties: Array<{ __typename?: 'property', id: number, name: string, description: string, address_1: string, address_2: string, city: string, state: string, zip_code: string, images: Array<string> }> } | null> | null };


export const OrganizationsByOwnerDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "OrganizationsByOwner" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "owner_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "follow_all" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Boolean" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "organizations" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "owner_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "owner_id" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "follow_all" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "follow_all" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "users" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "role" } }, { "kind": "Field", "name": { "kind": "Name", "value": "email" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "issues" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "type" } }, { "kind": "Field", "name": { "kind": "Name", "value": "author" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "assigned_id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "created_at" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "properties" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "description" } }, { "kind": "Field", "name": { "kind": "Name", "value": "address_1" } }, { "kind": "Field", "name": { "kind": "Name", "value": "address_2" } }, { "kind": "Field", "name": { "kind": "Name", "value": "city" } }, { "kind": "Field", "name": { "kind": "Name", "value": "state" } }, { "kind": "Field", "name": { "kind": "Name", "value": "zip_code" } }, { "kind": "Field", "name": { "kind": "Name", "value": "images" } }] } }] } }] } }] } as unknown as DocumentNode<OrganizationsByOwnerQuery, OrganizationsByOwnerQueryVariables>;