import { gql } from "graphql-request";

export const publicUserFragment = gql`
	user {
		id
		name
		role
		email
	}
`;

export const publicUsersFragment = gql`
	users {
		id
		name
		role
		email
	}
`;
