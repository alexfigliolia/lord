import { gql } from "graphql-request";
import { publicUserFragment } from "./user.gql";

export const logoutQuery = gql`
  query Logout {
    logout
  }
`;

export const loginQuery = gql`
	query Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			${publicUserFragment}
		}
	}
`;

export const verifyQuery = gql`
	query Verify {
		verifyToken {
			${publicUserFragment}
		}
	}
`;

export const onboardQuery = gql`
	query onBoard($name: String! $email: String!, $password: String!, $organization: String!) {
		onboard(name: $name, email: $email, password: $password, organization: $organization) {
			${publicUserFragment}
		}
	}
`;
