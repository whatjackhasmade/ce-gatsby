import React from "react";
import { Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import { generateID } from "../../storybook/src/components/helpers";

import StyledLogin from "./login.styles";

import LOGIN_USER_MUTATION from "../../storybook/src/components/particles/mutations/user/LOGIN_USER_MUTATION";

import Layout from "../../storybook/src/components/particles/layout";

import Link from "../../storybook/src/components/atoms/link/link";

import ErrorMessage from "../../storybook/src/components/molecules/error-message/errorMessage";

export default props => {
	const hasToken = localStorage.getItem("authToken");
	const [loginUser, { data, error, loading }] = useMutation(
		LOGIN_USER_MUTATION
	);

	const processLogin = async values => {
		const login = await loginUser({
			variables: { clientMutationId: generateID("login"), ...values }
		});

		if (
			!login ||
			!login.data ||
			!login.data.login ||
			!login.data.login.authToken
		)
			return false;

		localStorage.setItem("authToken", login.data.login.authToken);
	};

	return (
		<Layout {...props} cart={false} header={false} footer={false}>
			<StyledLogin>
				<div className="login__wrapper">
					{hasToken && (
						<>
							<h1 className="h3">You're already logged in</h1>
							<Link href="/">Return to homepage</Link>
						</>
					)}
					{!hasToken && (
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
											autoFocus={true}
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
