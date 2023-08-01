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
  invites?: Maybe<Invite>;
  issue: Issue;
  issueAttachment: IssueAttachment;
  issueAttachments: Array<IssueAttachment>;
  issues: Array<Issue>;
  lease?: Maybe<Lease>;
  leases?: Maybe<Array<Maybe<Lease>>>;
  login?: Maybe<Authentication>;
  logout?: Maybe<Scalars['Boolean']['output']>;
  organization?: Maybe<Organization>;
  organizations?: Maybe<Array<Maybe<Organization>>>;
  payment?: Maybe<Payments>;
  payments: Array<Payments>;
  properties?: Maybe<Array<Maybe<Property>>>;
  property?: Maybe<Property>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  verifyToken?: Maybe<Authentication>;
};


export type QueryInvitesArgs = {
  email: Scalars['Int']['input'];
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


export type QueryOrganizationsArgs = {
  owner_id: Scalars['Int']['input'];
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
  id?: InputMaybe<Scalars['Int']['input']>;
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
  role: UserRole;
};

export type OrganizationsByOwnerQueryVariables = Exact<{
  owner_id: Scalars['Int']['input'];
}>;


export type OrganizationsByOwnerQuery = { __typename?: 'Query', organizations?: Array<{ __typename?: 'organization', id: number, name: string } | null> | null };


export const OrganizationsByOwnerDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "OrganizationsByOwner" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "owner_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "organizations" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "owner_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "owner_id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }] } }] } as unknown as DocumentNode<OrganizationsByOwnerQuery, OrganizationsByOwnerQueryVariables>;