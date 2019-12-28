/* --------- Programatically Create Pages --------- */

const createPages = require(`./src/node/createPages`);
const createProducts = require(`./src/node/createProducts`);
const createPosts = require(`./src/node/createPosts`);

exports.createPages = async ({ actions, graphql }) => {
  await createPages({ actions, graphql });
  await createProducts({ actions, graphql });
  await createPosts({ actions, graphql });
};

/* --------- gatsby-node.js --------- */

const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter
}) => {
  const { createNode } = actions;
  createResolvers({
    WORDPRESS_MediaItem: {
      imageFile: {
        type: `File`,
        resolve(source, args, context, info) {
          return createRemoteFileNode({
            url: source.sourceUrl,
            store,
            cache,
            createNode,
            createNodeId,
            reporter
          });
        }
      }
    },
    WORDPRESS_ProductType: {
      imageFile: {
        type: `File`,
        resolve(source, args, context, info) {
          return createRemoteFileNode({
            url: source.image.mediaItemUrl,
            store,
            cache,
            createNode,
            createNodeId,
            reporter
          });
        }
      }
    }
  });
};
