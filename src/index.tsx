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

  const subMenuList = submenuItems.map((item) => (
    <li
      style={{
        height: "42px",
        listStyle: "none",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
      }}
    >
      <StatelyMenu
        UNSAFE_style={{
          display: "contents",
        }}
        aria-label="submenu"
        key={item.key}
        onAction={handleAction}
        onClose={() => setShowSubmenu(false)}
      >
        <Item key={item.key}>{item.label}</Item>
      </StatelyMenu>
    </li>
  ));

  return (
    <div style={{ position: "relative" }}>
      <Menu
        renderTrigger={(props) => <button {...props}>Actions</button>}
        onAction={handleAction}
      >
        <Item key="copy">Copy application</Item>
        <Item key="rename">Rename application</Item>
        <Item key="move">Move to</Item>
        <Item key="delete">Delete application</Item>
      </Menu>
      {showSubmenu && (
        <div
          style={{
            position: "absolute",
            left: "210px",
            top: "113px",
            height: "max-content",
            width: "100px",
            backgroundColor: "hsl(0, 0%, 100%)",
            boxShadow: "0 5px 10px 0 hsla(202, 12%, 56%, 0.2)",
            animation: "fade-in 0.1s ease-in-out",
            borderColor: "hsl(202, 12%, 87%)",
            borderRadius: "6px",
            fontFamily: '"Nunito", sans-serif',
            fontWeight: 600,
            fontSize: "16px",
            padding: "0 12px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {subMenuList}
        </div>
      )}
    </div>
  );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
