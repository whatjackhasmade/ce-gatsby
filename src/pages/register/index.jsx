import React from "react"
import { Formik } from "formik"
import { useMutation, useQuery } from "@apollo/react-hooks"

import StyledRegister from "./register.styles"

import CREATE_CUSTOMER_ACCOUNT from "../../mutations/user/CREATE_CUSTOMER_MUTATION"

import Layout from "../../storybook/src/components/particles/layout"

import Link from "../../storybook/src/components/atoms/link/link"

import ErrorMessage from "../../storybook/src/components/molecules/error-message/errorMessage"

export default props => {
  const [createAccount, { data, error, loading }] = useMutation(
    CREATE_CUSTOMER_ACCOUNT
  )

  {
    console.log({ data })
  }
  {
    console.log({ error })
  }
  {
    console.log({ loading })
  }

  return (
    <Layout {...props} cart={false} header={false} footer={false}>
      <StyledRegister>
        <div className="register__wrapper">
          <h1 className="h3">Register an account</h1>
          <Link href="/">Return to homepage</Link>
          {error && error.message && <ErrorMessage message={error.message} />}
          <Formik
            initialValues={{
              email: "",
              firstName: "",
              lastName: "",
              password: "",
            }}
            validate={values => {
              const errors = {}
              if (!values.firstName) errors.firstName = "Required"
              if (!values.lastName) errors.lastName = "Required"
              if (!values.password) errors.password = "Required"
              if (!values.email) errors.email = "Required"
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address"
              }
              return errors
            }}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={(values, { setSubmitting }) => {
              createAccount({
                variables: { clientMutationId: "test", ...values },
              })
              setSubmitting(false)
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form disabled={isSubmitting || loading} onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoFocus={true}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <ErrorMessage message={errors.email} />
                )}
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />
                {errors.firstName && touched.firstName && (
                  <ErrorMessage message={errors.firstName} />
                )}
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
                {errors.lastName && touched.lastName && (
                  <ErrorMessage message={errors.lastName} />
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
                  Creat{loading ? `ing` : `e`} Account
                </button>
              </form>
            )}
          </Formik>
        </div>
      </StyledRegister>
    </Layout>
  )
}
