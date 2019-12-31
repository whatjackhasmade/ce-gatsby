import React from "react";

import staticData from "./static.json";

import useAllProducts from "../gatsby/hooks/useAllProducts";

import Layout from "../storybook/src/components/particles/layout";

import Banner from "../storybook/src/components/organisms/banner/banner";
import Carousel from "../storybook/src/components/organisms/carousel/carousel";

const { banner, carousel } = staticData;

const Homepage = props => {
	const products = useAllProducts();
	const carouselProducts = products.map(p => p.node);

	console.log(products);

	return (
		<Layout {...props}>
			<Banner {...banner} />
			<Carousel {...carousel} items={carouselProducts} type="product" />
		</Layout>
	);
};

export default Homepage;
