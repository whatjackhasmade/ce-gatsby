import React from "react";

import StyledShop from "./shop.styles";

import Layout from "../../storybook/src/components/particles/layout";

import Link from "../../storybook/src/components/atoms/link/link";

import Archive from "../../storybook/src/components/organisms/archive/archive";

import useAllProducts from "../../gatsby/hooks/useAllProducts";

export default props => {
	const products = useAllProducts();
	const archiveProducts = products.map(p => p.node);
	console.log(archiveProducts);

	return (
		<Layout {...props}>
			<StyledShop>
				<section className="shop__wrapper">
					<h1>Our products</h1>
					<Archive items={archiveProducts} />
				</section>
			</StyledShop>
		</Layout>
	);
};
