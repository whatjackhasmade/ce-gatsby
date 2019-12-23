import gql from "graphql-tag"

export const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION(
    $clientMutationId: ID!
    $productId: Integer!
    $quantity: Integer
  ) {
    addToCart(
      input: {
        clientMutationId: $clientMutationId
        productId: $productId
        quantity: $quantity
      }
    ) {
      cartItem {
        key
      }
      clientMutationId
    }
  }
`

export default ADD_TO_CART_MUTATION
