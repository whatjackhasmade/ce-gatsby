import gql from "graphql-tag"

export const LOGIN_USER_MUTATION = gql`
  mutation LOGIN_USER_MUTATION(
    $clientMutationId: String!
    $password: String!
    $username: String!
  ) {
    login(
      input: {
        clientMutationId: $clientMutationId
        password: $password
        username: $username
      }
    ) {
      authToken
      user {
        id
        name
      }
    }
  }
`

export default LOGIN_USER_MUTATION
