import { useStaticQuery, graphql } from "gatsby";

export const useFooterMenuOne = () => {
	const { wordpress } = useStaticQuery(
		graphql`
			query GET_MENU_FOOTER_ONE {
				wordpress {
					menus(where: { location: FOOTER_ONE }) {
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

export default useFooterMenuOne;
