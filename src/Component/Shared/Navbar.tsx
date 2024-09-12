import type { MenuProps } from "antd";
import { Menu } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "products",
    label: (
      <Link to="/" style={{ fontWeight: "bold" }}>
        Products
      </Link>
    ),
  },
];

const NavBar: React.FC = () => {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      style={{
        marginBottom: "20px",
        borderRadius: "5px",
      }}
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default NavBar;
