import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Item } from "@react-stately/collections";
import { Menu } from "./Menu";

const App = () => {
  const handleAction = (actionKey: any) => {
    // Handle menu item actions here
    alert(`Action triggered: ${actionKey}`);
  };

  return (
    <Menu
      renderTrigger={(props) => <button {...props}>Actions</button>}
      onAction={handleAction}
    >
      <Item key="copy">Copy application</Item>
      <Item key="rename">Rename application</Item>
      <Item key="move" title="Move to">
        <Item key="move-to-shared">Shared</Item>
        <Item key="move-to-desktop">Desktop</Item>
        <Item key="move-to-favorite">Favorite</Item>
      </Item>
      <Item key="delete">Delete application</Item>
    </Menu>
  );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
