import { gql } from "graphql-request";

export const publicUserFragment = gql`
	user {
		id
		name
		role
		email
	}
`;
