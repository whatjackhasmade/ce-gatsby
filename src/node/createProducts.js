const path = require(`path`);
const mediaFields = require(`./fragments/media`);
const seoFields = require(`./fragments/seo`);

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
            ${mediaFields}
          }
          link
          menuOrder
          modified
          name
          onSale
          productCategories {
            nodes {
              count
              description
              id
              image {
                ${mediaFields}
              }
              title: name
              productCategoryId
					    ${seoFields}
              slug
            }
          }
          purchasable
          purchaseNote
          reviewCount
          reviewsAllowed
          ${seoFields}
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
