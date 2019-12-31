import React from "react";

import staticData from "./static.json";

import useAllProducts from "../gatsby/hooks/useAllProducts";

import Layout from "../storybook/src/components/particles/layout";

import Banner from "../storybook/src/components/organisms/banner/banner";
import Carousel from "../storybook/src/components/organisms/carousel/carousel";
import Panels from "../storybook/src/components/organisms/panels/panels";
import Slider from "../storybook/src/components/organisms/slider/slider";

const { banner, carousel, panels, slider } = staticData;

const Homepage = props => {
	const products = useAllProducts();
	const carouselProducts = products.map(p => p.node);

	return (
		<Layout {...props} headerVariant="fixedLight">
			<Slider {...slider} />
			<Panels {...panels} />
			<Banner {...banner} />
			<Carousel {...carousel} items={carouselProducts} type="product" />
		</Layout>
	);
};

export default Homepage;
