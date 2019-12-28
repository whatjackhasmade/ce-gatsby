import React from "react";
import { useQuery } from "@apollo/react-hooks";

import StyledAccount from "./account.styles";

import Debugger from "../../storybook/src/components/particles/debugger";
import Layout from "../../storybook/src/components/particles/layout";

import CUSTOMER_DETAILS_QUERY from "../../storybook/src/components/particles/queries/users/CUSTOMER_DETAILS_QUERY";
import ALL_USERS_QUERY from "../../storybook/src/components/particles/queries/users/ALL_USERS_QUERY";

import Link from "../../storybook/src/components/atoms/link/link";

import ErrorMessage from "../../storybook/src/components/molecules/error-message/errorMessage";
import Logout from "../../storybook/src/components/molecules/logout/logout";

import Accordion from "../../storybook/src/components/organisms/accordion/accordion";

export default props => {
	const ourAuthToken = localStorage.getItem("authToken");

	if (!ourAuthToken) {
		return (
			<Layout {...props} cart={false}>
				<StyledAccount>
					<div className="account__wrapper">
						<h1 className="h3">Login to view your account</h1>
						<Link href="/login">Login</Link>
					</div>
				</StyledAccount>
			</Layout>
		);
	}

	return (
		<Layout {...props} cart={false}>
			<StyledAccount>
				<div className="account__wrapper">
					<h1 className="h3">Account details</h1>
					<Link href="/">Return to homepage</Link>
					<CustomerDetails {...props} />
					<Logout title={null} />
				</div>
			</StyledAccount>
		</Layout>
	);
};

const CustomerDetails = () => {
	const { loading, error, data } = useQuery(CUSTOMER_DETAILS_QUERY);

	if (loading) return null;
	if (error) return <ErrorMessage message={error.message} />;

	const { customer } = data;

	return (
		<>
			<h2 className="account__username">{customer.username}</h2>
			<h3 className="account__email">{customer.email}</h3>
			<div className="account__shipping">
				<Accordion title="Shipping details">
					<form>
						<label htmlFor="address1">First name</label>
						<input id="firstName" name="firstName" type="text"></input>
						<label htmlFor="lastName">Last name</label>
						<input id="lastName" name="lastName" type="text"></input>
						<label htmlFor="email">Email Address</label>
						<input id="email" name="email" type="email"></input>
						<label htmlFor="address1">Address Line 1</label>
						<input id="address1" name="address1" type="text"></input>
						<label htmlFor="address2">Address Line 2</label>
						<input id="address2" name="address2" type="text"></input>
						<label htmlFor="city">City</label>
						<input id="city" name="city" type="text"></input>
						<label htmlFor="company">Company</label>
						<input id="company" name="company" type="text"></input>
						<label htmlFor="country">Country</label>
						<input id="country" name="country" type="country"></input>
						<button type="submit">Update Shipping Details</button>
					</form>
				</Accordion>
			</div>

			{customer.orders > 0 ? (
				<>
					{customer.orders.map(order => (
						<p>Order item</p>
					))}
				</>
			) : (
				<p>No orders yet</p>
			)}
			{customer.refunds > 0 && (
				<>
					{customer.refunds.map(refund => (
						<p>Refund item</p>
					))}
				</>
			)}
			<Debugger data={data} />
			{console.log(data)}
		</>
	);
};
