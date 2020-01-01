const path = require(`path`);
const mediaFields = require(`./fragments/media`);
const seoFields = require(`./fragments/seo`);

module.exports = async ({ actions, graphql }) => {
	const GET_POSTS = `
  query GET_POSTS($first:Int){
    wordpress {
      posts( first: $first ) {
        nodes {
          categories {
            nodes {
              description
              id
              name
              slug
            }
          }
          content
          date
          dateGmt
          featuredImage {
            ${mediaFields}
          }
          id
					${seoFields}
          slug
          status
          title
          uri
        }
      }
    }
  }
  `;

	const fetchPosts = async variables =>
		await graphql(GET_POSTS, variables).then(({ data }) => {
			return data.wordpress.posts.nodes;
		});

	await fetchPosts({ first: 500 }).then(allPosts => {
		allPosts.map(post => {
			console.log(`Creating post: ${post.slug}`);

			actions.createPage({
				path: `/${post.slug}`,
				component: path.resolve(
					`./src/storybook/src/components/templates/post/post.jsx`
				),
				context: {
					...post
				}
			});
		});
	});
};
