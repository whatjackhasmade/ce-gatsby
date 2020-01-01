const path = require(`path`);
const mediaFields = require(`./fragments/media`);
const productFields = require(`./fragments/product`);
const seoFields = require(`./fragments/seo`);

module.exports = async ({ actions, graphql }) => {
	const GET_PRODUCTS = `
  query ALL_PRODUCTS($first:Int) {
	  wordpress {
	    products( first: $first ) {
	      nodes {
          ${productFields}
          related {
            nodes {
              ${productFields}
            }
          }
	      }
	    }
	  }
	}
  `;

	const fetchProducts = async variables =>
		await graphql(GET_PRODUCTS, variables).then(({ data }) => {
			return data.wordpress.products.nodes;
		});

	await fetchProducts({ first: 500 }).then(allProducts => {
		allProducts.map(product => {
			if (!product.purchasable) return null;
			console.log(`Creating product: ${product.slug}`);

			actions.createPage({
				path: `/${product.slug}`,
				component: path.resolve(
					`./src/storybook/src/components/templates/product/product.jsx`
				),
				context: {
					...product
				}
			});
		});
	});
};
