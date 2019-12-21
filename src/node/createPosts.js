const path = require(`path`)

module.exports = async ({ actions, graphql }) => {
  const GET_POSTS = `
  query GET_POSTS($first:Int){
    wordpress {
      posts( first: $first ) {
				nodes {
          slug
					title
				}
      }
    }
  }
  `

  const fetchPosts = async variables =>
    await graphql(GET_POSTS, variables).then(({ data }) => {
      return data.wordpress.posts.nodes
    })

  await fetchPosts({ first: 500 }).then(allPosts => {
    allPosts.map(post => {
      console.log(`Creating post: ${post.slug}`)

      actions.createPage({
        path: `/post/${post.slug}`,
        component: path.resolve(
          `./src/storybook/src/components/templates/post.jsx`
        ),
        context: {
          ...post,
        },
      })
    })
  })
}
