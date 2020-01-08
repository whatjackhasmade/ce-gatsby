import React from "react";
import { Formik } from "formik";
import { navigate } from "gatsby";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { generateID } from "../../storybook/src/components/helpers";

import StyledAccount from "./account.styles";

import Layout from "../../storybook/src/components/particles/layout";

import CUSTOMER_DETAILS_QUERY from "../../storybook/src/components/particles/queries/users/CUSTOMER_DETAILS_QUERY";

import UPDATE_SHIPPING_MUTATION from "../../storybook/src/components/particles/mutations/user/UPDATE_SHIPPING_MUTATION";

import Link from "../../storybook/src/components/atoms/link/link";

import ErrorMessage from "../../storybook/src/components/molecules/error-message/errorMessage";
import Logout from "../../storybook/src/components/molecules/logout/logout";

import Accordion from "../../storybook/src/components/organisms/accordion/accordion";

export default props => {
	const ourAuthToken = localStorage.getItem("authToken");
	if (!ourAuthToken) navigate("/login/");

	return (
		<Layout {...props} cart={false}>
			<StyledAccount>
				<div className="account__wrapper">
					<header className="account__header">
						<h1 className="h5">Account details</h1>
						<div className="account__header__actions">
							<Link href="/">Return to homepage</Link>
							<Logout title="" />
						</div>
					</header>
					<CustomerDetails {...props} />
				</div>
			</StyledAccount>
		</Layout>
	);
};

const CustomerDetails = () => {
	const { loading, error, data } = useQuery(CUSTOMER_DETAILS_QUERY);

	if (loading) return <p>Loading...</p>;
	if (error) return <ErrorMessage message={error.message} />;

	const { customer } = data;

	return (
		<>
			<div className="account__ids">
				<h2 className="account__username h3">
					Welcome back, {customer.username}
				</h2>
				<h3 className="account__email">{customer.email}</h3>
			</div>
			<div className="account__shipping">
				<Accordion title="Shipping details">
					<UpdateShippingForm initial={customer.shipping} />
				</Accordion>
			</div>

			{customer.orders > 0 ? (
				<Accordion title={`(${customer.orderCount}) Your orders`}>
					{customer.orders.map(order => (
						<p>Order item</p>
					))}
				</Accordion>
			) : (
				<Accordion title="No orders">
					<Link href="/shop">Browse our products</Link>
				</Accordion>
			)}
			{customer.refunds > 0 && (
				<Accordion title="Refunds">
					{customer.refunds.map(refund => (
						<p>Refund item</p>
					))}
				</Accordion>
			)}
		</>
	);
};

const UpdateShippingForm = ({ initial }) => {
	const [updateShipping, { error, loading }] = useMutation(
		UPDATE_SHIPPING_MUTATION
	);

	const processUpdate = async values => {
		const variables = {
			clientMutationId: generateID("update-shipping-details"),
			...values
		};

		const res = await updateShipping({
			variables
		});

		if (res) return;
	};

	return (
		<>
			{error && <ErrorMessage message={error.message} />}
			<Formik
				initialValues={{
					firstName: "",
					lastName: "",
					email: "",
					address1: "",
					address2: "",
					city: "",
					company: "",
					country: ""
				}}
				validate={values => {
					const errors = {};
					if (!values.firstName) errors.firstName = "required";
					if (!values.lastName) errors.lastName = "required";
					if (!values.email) errors.email = "required";
					if (!values.address1) errors.address1 = "required";
					if (!values.address2) errors.address2 = "required";
					if (!values.city) errors.city = "required";
					if (!values.company) errors.company = "required";
					if (!values.country) errors.country = "required";
					return errors;
				}}
				validateOnBlur={false}
				validateOnChange={false}
				onSubmit={async (values, { setSubmitting }) => {
					await processUpdate(values);
					setSubmitting(false);
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting
					/* and other goodies */
				}) => (
					<form
						aria-busy={isSubmitting || loading}
						disabled={isSubmitting || loading}
						onSubmit={handleSubmit}
					>
						<FormInput
							errors={errors}
							handleBlur={handleBlur}
							handleChange={handleChange}
							name="firstName"
							touched={touched}
							type="text"
							values={values}
						/>
						<FormInput
							errors={errors}
							handleBlur={handleBlur}
							handleChange={handleChange}
							name="lastName"
							touched={touched}
							type="text"
							values={values}
						/>
						<FormInput
							errors={errors}
							handleBlur={handleBlur}
							handleChange={handleChange}
							name="email"
							touched={touched}
							type="email"
							values={values}
						/>
						<FormInput
							errors={errors}
							handleBlur={handleBlur}
							handleChange={handleChange}
							name="address1"
							touched={touched}
							type="text"
							values={values}
						/>
						<FormInput
							errors={errors}
							handleBlur={handleBlur}
							handleChange={handleChange}
							name="address2"
							touched={touched}
							type="text"
							values={values}
						/>
						<FormInput
							errors={errors}
							handleBlur={handleBlur}
							handleChange={handleChange}
							name="city"
							touched={touched}
							type="text"
							values={values}
						/>
						<FormInput
							errors={errors}
							handleBlur={handleBlur}
							handleChange={handleChange}
							name="company"
							touched={touched}
							type="text"
							values={values}
						/>
						<FormInput
							errors={errors}
							handleBlur={handleBlur}
							handleChange={handleChange}
							name="country"
							touched={touched}
							type="text"
							values={values}
						/>
						<button type="submit" disabled={isSubmitting || loading}>
							Updat
							{loading ? `ing` : `e`} Shipping Details
						</button>
					</form>
				)}
			</Formik>
		</>
	);
};

const FormInput = ({
	errors,
	handleBlur,
	handleChange,
	label,
	name,
	touched,
	type,
	values
}) => (
	<>
		<label htmlFor={name}>{label ? label : name}</label>
		<input
			type="text"
			id={name}
			name={name}
			onChange={handleChange}
			onBlur={handleBlur}
			value={values[name]}
		/>
		{errors[name] && touched[name] && (
			<ErrorMessage
				isDeveloperConcern={false}
				message={errors[name]}
				title={`${name} field is `}
			/>
		)}
	</>
);
