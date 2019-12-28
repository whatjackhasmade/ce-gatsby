import React from "react";

import useAllMenus from "./hooks/useAllMenus";
import useAllProducts from "./hooks/useAllProducts";
import useHeaderMenu from "./hooks/useHeaderMenu";

export const wrapPageElement = ({ element, props }) => {
  return <ProcessedProps {...props}>{element}</ProcessedProps>;
};

const ProcessedProps = props => {
  let allMenus = useAllMenus();
  let allProducts = useAllProducts();
  let menuHeader = useHeaderMenu();

  allMenus = allMenus.map(menu => menu.node);
  allProducts = allProducts.map(prod => prod.node);

  let footerMenus = allMenus.filter(menu => menu.slug !== "header-menu");
  footerMenus = footerMenus.map(menu => {
    return {
      items: menu.menuItems.edges.map(item => item.node),
      title: menu.name
    };
  });

  let headerMenu;
  headerMenu = menuHeader.map(node => node.node);
  headerMenu = [
    { items: headerMenu },
    {
      title: "account",
      items: [
        {
          icon: null,
          label: "Insights",
          target: null,
          url: "#"
        },
        {
          icon: null,
          label: "Account",
          target: null,
          url: "account"
        },
        {
          icon: "user",
          label: "User",
          target: null,
          url: "orders"
        },
        {
          icon: "bag",
          label: "Cart",
          target: null,
          url: "checkout"
        }
      ]
    }
  ];

  const newProps = {
    ...props,
    gatsbyContext: { allProducts, headerMenu, footerMenus }
  };

  return (
    <React.Fragment>
      {React.cloneElement(props.children, newProps)}
    </React.Fragment>
  );
};

export default wrapPageElement;
