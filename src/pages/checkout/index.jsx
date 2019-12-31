import React from "react";
import { useQuery } from "@apollo/react-hooks";

import StyledCheckout from "./checkout.styles";

import Layout from "../../storybook/src/components/particles/layout";

import CURRENT_CART_QUERY from "../../storybook/src/components/particles/queries/cart/CURRENT_CART_QUERY";

import Button from "../../storybook/src/components/atoms/button/button";
import Link from "../../storybook/src/components/atoms/link/link";

import CartItem from "../../storybook/src/components/molecules/cart-item/cartItem";
import ErrorMessage from "../../storybook/src/components/molecules/error-message/errorMessage";
import Payment from "../../storybook/src/components/molecules/payment/payment";

import Archive from "../../storybook/src/components/organisms/archive/archive";

export default props => {
	return (
		<Layout {...props} cart={false}>
			<CheckoutPage {...props} />
		</Layout>
	);
};

const CheckoutPage = props => {
	const { data, error, loading } = useQuery(CURRENT_CART_QUERY);
	const { gatsbyContext, items } = props;

	const cartHasContents =
		data &&
		data.cart &&
		data.cart.contents &&
		data.cart.contents.nodes &&
		data.cart.contents.nodes.length > 0;

	return (
		<StyledCheckout>
			<div className="checkout__wrapper">
				<div className="checkout__content">
					<Link href="/shop">Return to store</Link>
					<h1 className="h3">Checkout</h1>
					{cartHasContents && (
						<Payment
							className="checkout__summary__checkout"
							total={data.cart.total}
						>
							Continue to payment
						</Payment>
					)}
				</div>
				<aside className="checkout__summary">
					<header className="checkout__summary__header">
						<h2 className="checkout__summary__heading">Your Cart</h2>
						{data && data.cart && data.cart.total && (
							<span className="checkout__summary__total">
								{data.cart.total}
								{Number(data.cart.total.replace(/[^0-9]+/g, "")) > 100 &&
									` + Free P&P`}
							</span>
						)}
					</header>
					{loading && <p>Loading...</p>}
					{error && (
						<ErrorMessage isDeveloperConcern={true} message={error.message} />
					)}

					{!error && !loading && (!data || !data.cart || !data.cart.contents) && (
						<>
							<p>We couldn't find any items in your cart</p>
							<p>Try out these products!</p>
							{gatsbyContext && <Archive items={gatsbyContext.allProducts} />}
						</>
					)}
					{/*
					We could remove the support for `items` as a itterable key but to keep
					the component documented and updatable in storybook, we will have fallback
					support for when the application context is unavailable but items are provided.
				*/}
					<div className="checkout__summary__products">
						{cartHasContents &&
							data.cart.contents.nodes.map(product => (
								<CartItem {...product} />
							))}
						{!data &&
							items &&
							items.length > 0 &&
							items.map(product => <CartItem {...product} />)}
					</div>
					<div className="checkout__summary__actions">
						{/* If no items are available, disable the checkout option */}
						{cartHasContents && (
							<Button
								className="checkout__summary__checkout"
								disabled={error || loading}
								onClick={e => {
									e.preventDefault();
									alert("Time to pay");
								}}
								variant="tertiary"
							>
								Continue to payment
							</Button>
						)}
					</div>
				</aside>
			</div>
		</StyledCheckout>
	);
};
