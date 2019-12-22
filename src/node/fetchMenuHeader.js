module.exports = async ({ graphql }) => {
  const GET_MENU_HEADER = `
  query GET_MENU_HEADER($slug:String){
    wordpress {
      menus(where: { slug: $slug }) {
				edges {
					node {
						id
						name
						menuItems {
							edges {
								node {
									label
									url
								}
							}
						}
					}
				}
			}
    }
  }
  `

  const fetchMenuHeader = async variables =>
    await graphql(GET_MENU_HEADER, variables).then(({ data }) => {
      return data.wordpress.menus.edges[0].node.menuItems.edges
    })

  return await fetchMenuHeader({ slug: "header-menu" })
}
