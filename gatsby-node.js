/* --------- Programatically Create Pages --------- */

const createPages = require(`./src/node/createPages`)
const createPosts = require(`./src/node/createPosts`)

exports.createPages = async ({ actions, graphql }) => {
  await createPages({ actions, graphql })
  await createPosts({ actions, graphql })
}
