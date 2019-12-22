const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || `development`

console.log(`Using environment config: "${activeEnv}"`)

require(`dotenv`).config({
  path: `.env.${activeEnv}`,
})

console.log(`Using wordpress source: ${process.env.GATSBY_WORDPRESS_API}`)

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "WORDPRESS",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "wordpress",
        // Url to query from, this has to be static
        url: "https://celticwordpress.co.uk/graphql",
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.svg$/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/gatsby/gatsbyWrapper.jsx`),
      },
    },
  ],
}
