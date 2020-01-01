import React from "react";
import { navigate } from "gatsby";
import { Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import { generateID } from "../../storybook/src/components/helpers";

import StyledLogin from "./login.styles";

import LOGIN_USER_MUTATION from "../../storybook/src/components/particles/mutations/user/LOGIN_USER_MUTATION";

import Layout from "../../storybook/src/components/particles/layout";

import Button from "../../storybook/src/components/atoms/button/button";
import Link from "../../storybook/src/components/atoms/link/link";

import ErrorMessage from "../../storybook/src/components/molecules/error-message/errorMessage";

export default props => {
	const ourAuthToken = localStorage.getItem("authToken");
	const ourRefreshToken = localStorage.getItem("refreshToken");

	const [loginUser, { data, error, loading }] = useMutation(
		LOGIN_USER_MUTATION
	);

	if (ourAuthToken && ourRefreshToken) navigate("/account/");

	if (!ourAuthToken) localStorage.removeItem("refreshToken");
	if (!ourRefreshToken) localStorage.removeItem("authToken");

	const processLogin = async values => {
		const res = await loginUser({
			variables: {
				clientMutationId: generateID("login"),
				...values
			}
		});

		const { data } = res;
		const { login } = data;

		if (!login || !login.authToken || !login.refreshToken) {
			console.error(
				"Unable to retrieve authToken or refreshToken from login mutation"
			);
			return false;
		}

		localStorage.setItem("authToken", login.authToken);
		localStorage.setItem("refreshToken", login.refreshToken);
		navigate("/account/");
	};

	return (
		<Layout {...props} cart={false} header={false} footer={false}>
			<StyledLogin>
				<div className="login__wrapper">
					{ourAuthToken && ourRefreshToken && (
						<>
							<h1 className="h3">You're already logged in</h1>
							<Link href="/">Return to homepage</Link>
						</>
					)}
					{(!ourAuthToken || !ourRefreshToken) && (
						<>
							<h1 className="h3">Login to your account</h1>
							<Link href="/">Return to homepage</Link>
							{error && error.message && (
								<ErrorMessage message={error.message} />
							)}
							<Formik
								initialValues={{
									password: "",
									username: ""
								}}
								validate={values => {
									const errors = {};
									if (!values.password) errors.password = "Required";
									if (!values.username) errors.username = "Required";
									return errors;
								}}
								validateOnBlur={false}
								validateOnChange={false}
								onSubmit={async (values, { setSubmitting }) => {
									await processLogin(values);
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
										<label htmlFor="username">Username</label>
										<input
											type="text"
											id="username"
											name="username"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.username}
										/>
										{errors.username && touched.username && (
											<ErrorMessage message={errors.username} />
										)}
										<label htmlFor="password">Password</label>
										<input
											type="password"
											id="password"
											name="password"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.password}
										/>
										{errors.password && touched.password && (
											<ErrorMessage message={errors.password} />
										)}
										<button type="submit" disabled={isSubmitting || loading}>
											Log{loading ? `ging in` : `in`} to Account
										</button>
										<Button href="/register" variant="tertiary">
											Register account
										</Button>
									</form>
								)}
							</Formik>
						</>
					)}
				</div>
			</StyledLogin>
		</Layout>
	);
};
