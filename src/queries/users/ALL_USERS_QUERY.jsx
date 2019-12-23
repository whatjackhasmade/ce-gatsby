import gql from "graphql-tag"

export const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      nodes {
        name
      }
    }
  }
`

export default ALL_USERS_QUERY
