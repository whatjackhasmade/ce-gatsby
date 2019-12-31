import React from "react";

import StyledShop from "./shop.styles";

import Layout from "../../storybook/src/components/particles/layout";

import Link from "../../storybook/src/components/atoms/link/link";
import HR from "../../storybook/src/components/atoms/hr/hr";

import Archive from "../../storybook/src/components/organisms/archive/archive";

import useAllProducts from "../../gatsby/hooks/useAllProducts";

export default props => {
	const products = useAllProducts();
	const archiveProducts = products.map(p => p.node);

	return (
		<Layout {...props}>
			<StyledShop>
				<HR full={true} mt="0px" />
				<section className="shop__wrapper">
					<h1>Our products</h1>
					<Archive items={archiveProducts} />
				</section>
			</StyledShop>
		</Layout>
	);
};
