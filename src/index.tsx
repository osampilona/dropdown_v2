import React, { useState } from "react";
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

  const { hoverProps, isHovered } = useHover({ isDisabled });
  const subMenuList = submenuItems.map((item) => (
    <li
      key={item.key}
      className={clsx(
        styles["sapphire-menu-item"],
        styles["js-focus"],
        styles["js-hover"],
        {
          [styles["is-disabled"]]: isDisabled,
          [styles["is-focus"]]: isFocusVisible,
          [styles["is-hover"]]: isHovered,
        }
      )}
    >
      <StatelyMenu
        aria-label="submenu"
        key={item.key}
        onAction={handleAction}
        onClose={() => setShowSubmenu(false)}
      >
        <Item key={item.key} textValue={item.label}>
          <p className={styles["sapphire-menu-item-overflow"]}>{item.label}</p>
        </Item>
      </StatelyMenu>
    </li>
  ));

  return (
    <div className={styles["sapphire-menu"]}>
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
          className={clsx(styles["sapphire-menu-container"])}
          style={{
            position: "absolute",
            left: "210px",
            top: "112px",
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
