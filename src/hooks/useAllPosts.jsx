import { useStaticQuery, graphql } from "gatsby"

export const useAllPosts = () => {
  const { wordpress } = useStaticQuery(
    graphql`
      query AllWordPressPosts {
        wordpress {
          posts {
            nodes {
              slug
              title
            }
          }
        }
      }
    `
  )
  return wordpress.posts.nodes
}

export default useAllPosts
