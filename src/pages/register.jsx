import React from "react"
import { Formik } from "formik"
import { useMutation, useQuery } from "@apollo/react-hooks"

import CREATE_CUSTOMER_ACCOUNT from "../mutations/user/CREATE_CUSTOMER_MUTATION"

import ALL_USERS from "../queries/users/ALL_USERS"

export default () => {
  // const [createAccount, { data, loading }] = useMutation(
  //   CREATE_CUSTOMER_ACCOUNT
  // )

  // const { data, error, loading } = useQuery(ALL_USERS)

  return (
    <>
      <h1>Register an account</h1>
      <Formik
        initialValues={{ email: "", firstName: "", lastName: "", password: "" }}
        validate={values => {
          const errors = {}
          if (!values.email) {
            errors.email = "Required"
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address"
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          // createAccount({ variables: { ...values } })
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
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
            />
            {errors.firstName && touched.firstName && errors.firstName}
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
            />
            {errors.lastName && touched.lastName && errors.lastName}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </>
  )
}
