import React from "react";

import useAllProducts from "./hooks/useAllProducts";
import useFooterMenuOne from "./hooks/useFooterMenuOne";
import useFooterMenuTwo from "./hooks/useFooterMenuTwo";
import useFooterMenuThree from "./hooks/useFooterMenuThree";
import useHeaderMenu from "./hooks/useHeaderMenu";
import useGlobalFields from "./hooks/useGlobalFields";

export const wrapPageElement = ({ element, props }) => {
	return <ProcessedProps {...props}>{element}</ProcessedProps>;
};

const ProcessedProps = props => {
	const globalFields = useGlobalFields();
	let allProducts = useAllProducts();
	let menuHeader = useHeaderMenu();

	allProducts = allProducts.map(prod => prod.node);

	const footerMenuOne = useFooterMenuOne();
	const footerMenuTwo = useFooterMenuTwo();
	const footerMenuThree = useFooterMenuThree();

	let footerMenus = [footerMenuOne, footerMenuTwo, footerMenuThree];
	footerMenus = footerMenus.map(menu => {
		return {
			items: menu.menuItems.edges.map(item => item.node),
			title: menu.name
		};
	});

	let headerMenu;
	headerMenu = menuHeader.map(node => node.node);
	headerMenu = [
		{ items: headerMenu },
		{
			title: "account",
			items: [
				{
					icon: null,
					label: "Posts",
					target: null,
					url: "posts"
				},
				{
					icon: null,
					label: "Orders",
					target: null,
					url: "orders"
				},
				{
					icon: "user",
					label: "User",
					target: null,
					url: "login"
				},
				{
					icon: "bag",
					label: "Cart",
					target: null,
					url: "checkout"
				}
			]
		}
	];

	const newProps = {
		...props,
		gatsbyContext: { allProducts, footerMenus, globalFields, headerMenu }
	};

	return (
		<React.Fragment>
			{React.cloneElement(props.children, newProps)}
		</React.Fragment>
	);
};

export default wrapPageElement;
