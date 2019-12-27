import gql from "graphql-tag";

export const CREATE_CUSTOMER_MUTATION = gql`
	mutation CREATE_CUSTOMER_MUTATION(
		$clientMutationId: String!
		$email: String!
		$firstName: String
		$lastName: String
		$password: String!
	) {
		registerUser(
			input: {
				clientMutationId: $clientMutationId
				email: $email
				firstName: $firstName
				lastName: $lastName
				nickname: $email
				password: $password
				username: $email
			}
		) {
			clientMutationId
			user {
				email
				jwtAuthToken
			}
		}
	}
`;

export default CREATE_CUSTOMER_MUTATION;
