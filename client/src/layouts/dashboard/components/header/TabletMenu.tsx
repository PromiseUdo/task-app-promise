// import useLogout from '@/apis/hooks/useLogout'
import iconComponents from "@/assets/icons/iconComponents";
import Modal from "@/common/modal/Modal";
import { Storage } from "@/helpers/Storage";
import useGetCssValue from "@/hooks/useGetCssValue";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useToggleState } from "@/hooks/useToggleState";
import React, { useMemo, useRef, useState } from "react";

import { MenuItem } from "../../dashboard.types";
import LogoutWarning, { DONT_SHOW_LOGOUT_MODAL } from "../LogoutWarning";
import NavItem from "../NavItem";
import UserInfo from "../UserInfo";

type TabletMenuProps = {
  menuOptions: MenuItem[];
};
const TabletMenu = (props: TabletMenuProps) => {
  const { menuOptions } = props;

  const [userRef, userWidth] = useGetCssValue("width", "130px");
  const {
    state: showMore,
    toggle: toggleMore,
    close: closeMore,
  } = useToggleState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  //   const logout = useLogout()
  const {
    state: isModalOpen,
    open: openModal,
    close: closeModal,
  } = useToggleState(false);
  const dontShow = Storage.getItem(DONT_SHOW_LOGOUT_MODAL);
  const logoutHandler = () => {
    if (dontShow) {
      //   logout();
    } else {
      openModal();
    }
  };
  const showSideBar = () => {};
  useOutsideClick([moreRef], () => closeMore());
  const allOptions = [
    ...menuOptions,

    {
      name: "Settings",
      icon: iconComponents.navigation.SettingsIcon,
      url: `/app/setting`,
    },
    {
      name: "Log Out",
      icon: iconComponents.navigation.LogoutIcon,
      onClick: logoutHandler,
    },
  ];
  const howManyElement = useMemo(() => {
    const spacing = 86 + 92 + parseInt(userWidth);
    const bodyWidth = getComputedStyle(document.body).getPropertyValue("width");
    return Math.floor((parseInt(bodyWidth) - spacing - 32) / 72);
  }, [userWidth]);

  return (
    <div className="w-full flex justify-between items-center gap-8 pr-8 z-[1000]">
      <nav className="">
        <ul role="menu" className="flex gap-8 justify-between items-center ">
          {allOptions.slice(0, howManyElement - 1).map((menu) => (
            <NavItem key={menu.name} {...menu} />
          ))}
          {allOptions.length > howManyElement && (
            <div className="relative" ref={moreRef}>
              <NavItem
                name="More"
                icon={iconComponents.util.MoreHorizonIcon}
                onClick={() => toggleMore()}
              />
              {showMore && (
                <ul
                  onClick={closeMore}
                  className="flex flex-col fixed !z-50 top-[80px]  mx-8 left-0  w-[calc(100vw_-_64px)] bg-expectoo-shades-white items-start px-4 py-2 rounded-lg h-auto shadow-sm"
                >
                  {allOptions.slice(howManyElement - 1).map((menu) => {
                    return <NavItem key={menu.name} {...menu} showText />;
                  })}
                </ul>
              )}
            </div>
          )}
        </ul>
      </nav>
      <UserInfo ref={userRef} />
      <Modal variant="sm" open={isModalOpen} onClose={closeModal}>
        <LogoutWarning onClose={closeModal} logoutAction={() => {}} />
      </Modal>
    </div>
  );
};

export default TabletMenu;
