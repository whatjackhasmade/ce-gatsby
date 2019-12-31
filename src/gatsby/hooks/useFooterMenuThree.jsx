import { useStaticQuery, graphql } from "gatsby";

export const useFooterMenuThree = () => {
	const { wordpress } = useStaticQuery(
		graphql`
			query GET_MENU_FOOTER_THREE {
				wordpress {
					menus(where: { location: FOOTER_THREE }) {
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

export default useFooterMenuThree;
