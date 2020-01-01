const path = require(`path`);
const blocks = require(`./fragments/blocks/allBlocks`);

module.exports = async ({ actions, graphql }) => {
	const GET_PAGES = `
  query GET_PAGES($first:Int){
    wordpress {
      pages( first: $first ) {
				nodes {
					blocks {
						name
						${blocks.acfBanner}
						${blocks.acfCarousel}
						${blocks.acfPanels}
						${blocks.acfRow}
						${blocks.acfSlider}
					}
          content
          isFrontPage
					title
					uri
				}
      }
    }
  }
  `;
	const { createPage } = actions;

	const fetchPages = async variables =>
		await graphql(GET_PAGES, variables).then(({ data }) => {
			return data.wordpress.pages.nodes;
		});

	await fetchPages({ first: 500 }).then(allPages => {
		allPages.map(page => {
			console.log(`Creating page: ${page.uri}`);

			const { isFrontPage } = page;
			const uri = isFrontPage ? `/` : `/${page.uri}`;

			actions.createPage({
				path: uri,
				component: path.resolve(
					`./src/storybook/src/components/templates/page/page.jsx`
				),
				context: {
					...page
				}
			});
		});
	});
};
