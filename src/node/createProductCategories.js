const path = require(`path`);
const mediaFields = require(`./fragments/media`);
const seoFields = require(`./fragments/seo`);

module.exports = async ({ actions, graphql }) => {
	const GET_PRODUCT_CATEGORIES = `
  query ALL_PRODUCT_CATEGORIES ($first:Int) {
	  wordpress {
			productCategories ( first: $first ) {
				nodes {
					count
					description
					id
					image {
						${mediaFields}
					}
					name
					productCategoryId
					products {
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
							title: name
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
					${seoFields}
					slug
				}
			}
	  }
	}
  `;

	const fetchProductCategories = async variables =>
		await graphql(GET_PRODUCT_CATEGORIES, variables).then(({ data }) => {
			return data.wordpress.productCategories.nodes;
		});

	await fetchProductCategories({ first: 500 }).then(allCategories => {
		allCategories.map(category => {
			if (!category.count || category.count === 0) return null;
			console.log(`Creating product category: ${category.slug}`);

			actions.createPage({
				path: `/product-category/${category.slug}`,
				component: path.resolve(
					`./src/storybook/src/components/templates/product-category/product-category.jsx`
				),
				context: {
					...category
				}
			});
		});
	});
};
