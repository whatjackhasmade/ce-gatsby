import React from "react";

import staticData from "./static.json";

import Layout from "../storybook/src/components/particles/layout";

import Banner from "../storybook/src/components/organisms/banner/banner";
import Carousel from "../storybook/src/components/organisms/carousel/carousel";

const { banner, carousel } = staticData;

const Homepage = props => (
	<Layout {...props}>
		<Banner {...banner} />
		<Carousel {...carousel} />
	</Layout>
);

export default Homepage;
