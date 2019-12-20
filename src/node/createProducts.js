const path = require(`path`)

module.exports = async ({ actions, graphql }) => {
  const GET_PRODUCTS = `
  query ALL_PRODUCTS($first:Int) {
	  wordpress {
	    products( first: $first ) {
	      nodes {
	        name
	        slug
	      }
	    }
	  }
	}
  `

  const fetchProducts = async variables =>
    await graphql(GET_PRODUCTS, variables).then(({ data }) => {
      return data.wordpress.products.nodes
    })

  await fetchProducts({ first: 500 }).then(allProducts => {
    allProducts.map(product => {
      console.log(`Creating product: ${product.slug}`)

      actions.createPage({
        path: `/${product.slug}`,
        component: path.resolve(`./src/storybook/templates/product.jsx`),
        context: {
          ...product,
        },
      })
    })
  })
}
