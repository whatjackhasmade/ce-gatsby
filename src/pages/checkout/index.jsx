import React, { useContext } from "react";
import { calculateTotalCost } from "../../storybook/src/components/helpers.js";

import StyledCheckout from "./checkout.styles";

import Button from "../../storybook/src/components/atoms/button/button";
import Link from "../../storybook/src/components/atoms/link/link";

import CartItem from "../../storybook/src/components/molecules/cart-item/cartItem";

import Archive from "../../storybook/src/components/organisms/archive/archive";

import Layout from "../../storybook/src/components/particles/layout";
import ApplicationContext from "../../storybook/src/components/particles/context/applicationContext";

export default props => {
  return (
    <Layout {...props} cart={false}>
      <CheckoutPage {...props} />
    </Layout>
  );
};

const CheckoutPage = props => {
  const { gatsbyContext } = props;
  const { state } = useContext(ApplicationContext);
  // Desctructure the cart value from our context (Initially [])
  const { cart } = state;
  const { items } = props;

  if (!cart || !cart.length) {
    return (
      <StyledCheckout>
        <div className="checkout__wrapper">
          <div className="checkout__content">
            <Link href="/">Return to store</Link>
            <h1 className="h3">Checkout</h1>
            <p>We couldn't find any items in your cart</p>
            <p>Try out these products!</p>
            {gatsbyContext && <Archive items={gatsbyContext.allProducts} />}
          </div>
        </div>
      </StyledCheckout>
    );
  }

  const total = calculateTotalCost(cart);

  return (
    <StyledCheckout>
      <div className="checkout__wrapper">
        <div className="checkout__content">
          <Link href="/">Return to store</Link>
          <h1 className="h3">Checkout</h1>
          <Button
            className="checkout__summary__checkout"
            disabled={(cart || items) && !cart.length && !items.length}
            onClick={e => {
              e.preventDefault();
              alert("Time to pay");
            }}
          >
            Continue to payment
          </Button>
        </div>
        <aside className="checkout__summary">
          <header className="checkout__summary__header">
            <h2 className="checkout__summary__heading">Your Cart</h2>
            {total && (
              <span className="checkout__summary__total">
                {total}
                {parseFloat(total.toString().substr(1)) > 100 && ` + Free P&P`}
              </span>
            )}
          </header>
          {/*
					We could remove the support for `items` as a itterable key but to keep
					the component documented and updatable in storybook, we will have fallback
					support for when the application context is unavailable but items are provided.
				*/}
          {((cart && cart.length) || (items && items.length)) && (
            <div className="checkout__summary__products">
              {cart && cart.length
                ? cart.map(product => <CartItem {...product} />)
                : items.map(product => <CartItem {...product} />)}
            </div>
          )}
          <div className="checkout__summary__actions">
            {/* If no items are available, disable the checkout option */}
            <Button
              className="checkout__summary__checkout"
              disabled={(cart || items) && !cart.length && !items.length}
              onClick={e => {
                e.preventDefault();
                alert("Time to pay");
              }}
              variant="tertiary"
            >
              Continue to payment
            </Button>
          </div>
        </aside>
      </div>
    </StyledCheckout>
  );
};
