import { useStaticQuery, graphql } from "gatsby";

export const useAllMenus = () => {
  const { wordpress } = useStaticQuery(
    graphql`
      query GET_ALL_MENUS {
        wordpress {
          menus {
            edges {
              node {
                id
                name
                slug
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
  return wordpress.menus.edges;
};

export default useAllMenus;
