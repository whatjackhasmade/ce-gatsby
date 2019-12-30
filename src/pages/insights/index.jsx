import React from "react";

import StyledInsights from "./insights.styles";

import Link from "../../storybook/src/components/atoms/link/link";

import Layout from "../../storybook/src/components/particles/layout";

export default props => {
	console.log(props);

	return (
		<Layout {...props} cart={false}>
			<InsightsPage {...props} />
		</Layout>
	);
};

const InsightsPage = props => {
	return (
		<StyledInsights>
			<div className="checkout__wrapper">
				<div className="checkout__content">
					<Link href="/">Return to store</Link>
					<h1 className="h3">Checkout</h1>
					<p>We couldn't find any items in your cart</p>
					<p>Try out these products!</p>
				</div>
			</div>
		</StyledInsights>
	);
};
