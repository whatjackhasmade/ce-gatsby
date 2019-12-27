import React from "react";

import StyledOrders from "./orders.styles";

import Link from "../../storybook/src/components/atoms/link/link";

import Layout from "../../storybook/src/components/particles/layout";

export default props => {
	return (
		<Layout {...props} cart={false}>
			<StyledOrders>
				<div className="register__wrapper">
					<h1 className="h3">Your orders</h1>
					<Link href="/account">Return to account</Link>
				</div>
			</StyledOrders>
		</Layout>
	);
};
