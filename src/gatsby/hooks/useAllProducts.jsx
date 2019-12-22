import { useStaticQuery, graphql } from "gatsby"

export const useAllProducts = () => {
  const { wordpress } = useStaticQuery(
    graphql`
      query GET_ALL_PRODUCTS {
        wordpress {
          products(first: 500) {
            edges {
              node {
                id
                productId
                name
                slug
              }
            }
          }
        }
      }
    `
  )
  return wordpress.products.edges
}

export default useAllProducts
