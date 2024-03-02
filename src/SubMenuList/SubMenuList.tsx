import React from "react";
import clsx from "clsx";
import styles from "../Menu/Menu.module.css";
import { Menu as StatelyMenu, Item } from "@react-spectrum/menu";
import { useHover } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";
import { useFocusRing } from "@react-aria/focus";

interface SubMenuListProps {
  submenuItems: { key: string; label: string }[];
  isDisabled: boolean;
  isFocusVisible: boolean;
  onClose: () => void;
}

const SubMenuList: React.FC<SubMenuListProps> = ({
  submenuItems,
  isDisabled,
  isFocusVisible,
  onClose,
}) => {
  const { hoverProps, isHovered } = useHover({ isDisabled });

  // Modify the onAction and onClose handlers
  const handleAction = () => {
    console.log("Submenu item action");
    onClose();
  };

  const handleClose = () => {
    console.log("Submenu closed");
    onClose();
  };

  return submenuItems.map((item) => (
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
        onClose={handleClose}
      >
        <Item key={item.key} textValue={item.label}>
          <p className={styles["sapphire-menu-item-overflow"]}>{item.label}</p>
        </Item>
      </StatelyMenu>
    </li>
  ));
};

export default SubMenuList;
