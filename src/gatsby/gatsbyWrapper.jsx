import React from "react"

import useHeaderMenu from "./hooks/useHeaderMenu"

const PropProducer = props => {
  const menuHeader = useHeaderMenu()
  let headerMenu
  headerMenu = menuHeader.map(node => node.node)
  headerMenu = [
    { items: headerMenu },
    {
      title: "account",
      items: [
        {
          icon: null,
          label: "Insights",
          target: null,
          url: "#",
        },
        {
          icon: null,
          label: "Account",
          target: null,
          url: "account",
        },
        {
          icon: "user",
          label: "User",
          target: null,
          url: "orders",
        },
        {
          icon: "bag",
          label: "Cart",
          target: null,
          url: "checkout",
        },
      ],
    },
  ]

  const newProps = { ...props, gatsbyContext: { headerMenu } }

  return <>{React.cloneElement(props.children, newProps)}</>
}

export default PropProducer
