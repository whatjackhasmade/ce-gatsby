import React from "react"

import StyledAccount from "./account.styles"

import Layout from "../../storybook/src/components/particles/layout"

import Link from "../../storybook/src/components/atoms/link/link"

import Logout from "../../storybook/src/components/molecules/logout/logout"

export default props => {
  return (
    <Layout {...props} cart={false}>
      <StyledAccount>
        <div className="register__wrapper">
          <h1 className="h3">Register an account</h1>
          <Link href="/">Return to homepage</Link>
          <Logout />
        </div>
      </StyledAccount>
    </Layout>
  )
}
