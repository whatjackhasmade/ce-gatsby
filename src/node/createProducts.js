const path = require(`path`);

const fluidImage = require(`./fragments/gatsby/fluid`);

module.exports = async ({ actions, graphql }) => {
	const GET_PRODUCTS = `
  query ALL_PRODUCTS($first:Int) {
	  wordpress {
	    products( first: $first ) {
	      nodes {
          id
          productId
          averageRating
          catalogVisibility
          date
          dateOnSaleFrom
          dateOnSaleTo
          description(format: RENDERED)
          featured
          image {
            mediaItemUrl
          }
          link
          menuOrder
          modified
          name
          onSale
          purchasable
          purchaseNote
          reviewCount
          reviewsAllowed
          shortDescription(format: RENDERED)
          sku
          slug
          status
          totalSales
          type
          ... on WORDPRESS_SimpleProduct {
            price
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
