import { useStaticQuery, graphql } from "gatsby";

export const useHeaderMenu = () => {
  const { wordpress } = useStaticQuery(
    graphql`
      query GET_MENU_HEADER {
        wordpress {
          menus(where: { location: HEADER }) {
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
  );
  return wordpress.menus.edges[0].node.menuItems.edges;
};

export default useHeaderMenu;
