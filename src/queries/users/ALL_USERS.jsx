import gql from "graphql-tag"

export const ALL_USERS = gql`
  query ALL_USERS {
    users {
      nodes {
        name
      }
    }
  }
`

export default ALL_USERS
