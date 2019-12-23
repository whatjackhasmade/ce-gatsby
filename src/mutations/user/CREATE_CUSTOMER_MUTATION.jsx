import gql from "graphql-tag"

export const CREATE_CUSTOMER_ACCOUNT = gql`
  mutation CREATE_CUSTOMER_ACCOUNT(
    $clientMutationId: String!
    $email: String!
    $firstName: String
    $lastName: String
    $password: String!
  ) {
    createUser(
      input: {
        clientMutationId: $clientMutationId
        username: $email
        password: $password
        nickname: $email
        email: $email
        roles: ["Customer"]
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      clientMutationId
      user {
        email
      }
    }
  }
`

export default CREATE_CUSTOMER_ACCOUNT
