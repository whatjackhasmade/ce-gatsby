const path = require(`path`);

module.exports = async ({ actions, graphql }) => {
  const GET_PAGES = `
  query GET_PAGES($first:Int){
    wordpress {
      pages( first: $first ) {
				nodes {
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
      if (isFrontPage) return null;
      const uri = isFrontPage ? `/` : `/${page.uri}`;

      actions.createPage({
        path: uri,
        component: path.resolve(
          `./src/storybook/src/components/templates/page.jsx`
        ),
        context: {
          ...page
        }
      });
    });
  });
};
