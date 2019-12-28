import React from "react";

import staticData from "./static.json";

import Banner from "../storybook/src/components/organisms/banner/banner";
import Carousel from "../storybook/src/components/organisms/carousel/carousel";

const { banner, carousel } = staticData;

const Homepage = () => (
  <>
    <Banner {...banner} />
    <Carousel {...carousel} />
  </>
);

export default Homepage;
