import React, { Key, useState } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Menu as StatelyMenu, Item } from "@react-spectrum/menu";
import { Menu } from "./Menu";
import "./styles.css";
import clsx from "clsx";
import styles from "./Menu/Menu.module.css";
import { useHover } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import { useFocusRing } from "@react-aria/focus";

const App = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { isFocusVisible } = useFocusRing();

  const handleAction = (actionKey: any) => {
    if (actionKey === "move") {
      setShowSubmenu((prevShowSubmenu) => !prevShowSubmenu);
    } else {
      console.log("Main menu item action:", actionKey);
    }
  };

  const submenuItems = [
    { key: "move-to-shared", label: "Shared" },
    { key: "move-to-desktop", label: "Desktop" },
    { key: "move-to-favorite", label: "Favorite" },
  ];

  const { hoverProps, isHovered } = useHover({ isDisabled });

  const CustomMenu = (
    <StatelyMenu
      UNSAFE_style={{ border: "none" }}
      aria-label="submenu"
      onAction={(key: Key) => {
        handleAction(key);
        setShowSubmenu(false);
      }}
      onClose={() => setShowSubmenu(false)}
    >
      {submenuItems.map((item) => {
        return (
          <Item key={item.key} textValue={item.label}>
            <p>{item.label}</p>
          </Item>
        );
      })}
    </StatelyMenu>
  );

  return (
    <div className={styles["sapphire-menu"]}>
      <Menu
        renderTrigger={(props) => <button {...props}>Actions</button>}
        onAction={handleAction}
        setShowSubmenu={setShowSubmenu}
      >
        <Item key="copy">Copy application</Item>
        <Item key="rename">Rename application</Item>
        <Item key="move">Move to</Item>
        <Item key="delete">Delete application</Item>
      </Menu>
      {showSubmenu && (
        <div
          className={clsx(styles["sapphire-menu-container"])}
          style={{
            position: "absolute",
            left: "210px",
            top: "112px",
            padding: "0 12px",
            width: "130px",
            fontFamily: "Nunito, sans-serif",
            fontSize: "16px",
            fontStyle: "normal",
          }}
        >
          {CustomMenu}
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
