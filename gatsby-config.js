const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || `development`

console.log(`Using environment config: "${activeEnv}"`)

require(`dotenv`).config({
  path: `.env.${activeEnv}`,
})

console.log(`Using wordpress source: ${process.env.GATSBY_WORDPRESS_API}`)

module.exports = {}
