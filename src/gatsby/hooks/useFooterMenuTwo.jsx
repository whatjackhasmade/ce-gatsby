import { useStaticQuery, graphql } from "gatsby";

export const useFooterMenuTwo = () => {
	const { wordpress } = useStaticQuery(
		graphql`
			query GET_MENU_FOOTER_TWO {
				wordpress {
					menus(where: { location: FOOTER_TWO }) {
						edges {
							node {
								id
								name
								menuItems {
									edges {
										node {
											label
											url
										}
									}
								}
							}
						}
					}
				}
			}
		`
	);
	return wordpress.menus.edges[0].node;
};

export default useFooterMenuTwo;
