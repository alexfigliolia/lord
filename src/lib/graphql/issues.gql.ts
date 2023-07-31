import { gql } from "graphql-request";

export const issueFragment = gql`
	issues {
		id
		status
		type
		author
		title
		unit_id,
		description
		assigned_id
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
      property_id
      description
      created_at
      assigned {
        name
      }
    }
  }
`;
