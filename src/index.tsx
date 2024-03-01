import React, { useState } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Menu as StatelyMenu, Item } from "@react-spectrum/menu";
import { Menu } from "./Menu";

const App = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);

  const handleAction = (actionKey: any) => {
    // Handle menu item actions here
    if (actionKey === "move") {
      console.log("Move to is clicked");
      setShowSubmenu(true);
      return subMenuList;
    }
  };

  const submenuItems = [
    { key: "move-to-shared", label: "Shared" },
    { key: "move-to-desktop", label: "Desktop" },
    { key: "move-to-favorite", label: "Favorite" },
  ];

  const subMenuList = [
    <StatelyMenu aria-label="submenu" key="submenu" onAction={handleAction}>
      {submenuItems.map((item) => (
        <Item key={item.key}>{item.label}</Item>
      ))}
    </StatelyMenu>,
  ];

  return (
    <>
      <Menu
        renderTrigger={(props) => <button {...props}>Actions</button>}
        onAction={handleAction}
      >
        <Item key="copy">Copy application</Item>
        <Item key="rename">Rename application</Item>
        <Item key="move">Move to</Item>
        <Item key="delete">Delete application</Item>
      </Menu>
      {showSubmenu && subMenuList}
    </>
  );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
