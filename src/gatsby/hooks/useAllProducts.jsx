import { useStaticQuery, graphql } from "gatsby";

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
								description
								image {
									mediaItemUrl
								}
								productCategories {
									nodes {
										title: name
										slug
									}
								}
								purchasable
								title: name
								shortDescription
								slug
								... on WORDPRESS_SimpleProduct {
									price
								}
							}
						}
					}
				}
			}
		`
	);
	return wordpress.products.edges;
};

export default useAllProducts;
