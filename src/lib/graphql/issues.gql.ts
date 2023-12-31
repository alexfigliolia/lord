import { gql } from "graphql-request";

export const IssueFragment = gql`
  fragment IssueFragment on issue {
    id
    status
    type
    author
    title
    unit_id
    property_id
    description
    assigned {
      id
      name
    }
    created_at
  }
`;

export const IssuesWithPropertyFragment = gql`
  fragment IssuesWithPropertyFragment on issue {
    id
    status
    type
    author
    title
    unit_id
    property_id
    description
    assigned_id
    assigned {
      id
      name
    }
    property {
      id
      name
    }
    created_at
  }
`;

export const createIssueMutation = gql`
  mutation CreateIssue(
    $title: String!
    $author: String!
    $description: String!
    $property_id: Int!
    $unit_id: Int
    $organization_id: Int!
    $assigned_id: Int
    $status: IssueStatus
    $type: IssueType!
  ) {
    createIssue(
      title: $title
      author: $author
      description: $description
      unit_id: $unit_id
      property_id: $property_id
      organization_id: $organization_id
      assigned_id: $assigned_id
      status: $status
      type: $type
    ) {
      id
      status
      type
      author
      title
      unit_id
      property_id
      description
      created_at
      assigned {
        id
        name
      }
    }
  }
`;

export const setIssueStatusMutation = gql`
  mutation SetStatus($id: Int!, $status: IssueStatus!) {
    setIssueStatus(id: $id, status: $status) {
      id
    }
  }
`;

export const assignIssueMutation = gql`
  mutation AssignIssue($issue_id: Int!, $user_id: Int) {
    setIssueAssignment(issue_id: $issue_id, user_id: $user_id) {
      id
    }
  }
`;
