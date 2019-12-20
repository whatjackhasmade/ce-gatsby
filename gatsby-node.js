/* --------- Programatically Create Pages --------- */

const createPages = require(`./src/node/createPages`)
const createProducts = require(`./src/node/createProducts`)
const createPosts = require(`./src/node/createPosts`)

exports.createPages = async ({ actions, graphql }) => {
  await createPages({ actions, graphql })
  await createProducts({ actions, graphql })
  await createPosts({ actions, graphql })
}
