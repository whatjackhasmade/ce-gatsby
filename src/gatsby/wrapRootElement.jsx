import React from "react"
import { ThemeProvider } from "styled-components"

import ApolloWrapper from "../storybook/src/components/particles/apollo/wrapper"
import ApplicationState from "../storybook/src/components/particles/context/applicationState"
import GlobalStyle from "../storybook/src/components/particles/globalStyle"
import ThemeDefault from "../storybook/src/components/particles/themeDefault"

export const wrapRootElement = ({ element }) => (
  <ApolloWrapper>
    <ApplicationState>
      <ThemeProvider theme={ThemeDefault}>
        <GlobalStyle />
        {element}
      </ThemeProvider>
    </ApplicationState>
  </ApolloWrapper>
)

export default wrapRootElement
