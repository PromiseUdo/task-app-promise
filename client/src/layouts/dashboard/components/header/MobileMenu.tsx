import useLockBodyScroll from "@/hooks/useLockBodyScroll";
import { useToggleState } from "@/hooks/useToggleState";
import iconComponents from "@/assets/icons/iconComponents";
import { MenuItem } from "../../dashboard.types";
import NavItem from "../NavItem";
import UserInfo from "../UserInfo";
import Modal from "@/common/modal/Modal";
import LogoutWarning, { DONT_SHOW_LOGOUT_MODAL } from "../LogoutWarning";
// import useLogout from "@/apis/hooks/useLogout";
import { Storage } from "@/helpers/Storage";

type MobileMenuProps = {
  menuOptions: MenuItem[];
};
const MobileMenu = (props: MobileMenuProps) => {
  const {
    state: showDrawer,
    toggle: toggleDrawer,
    close: closeDrawer,
  } = useToggleState(false);
  const { menuOptions } = props;
  //   const logout = useLogout();
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
  useLockBodyScroll(showDrawer);
  return (
    <div className="max-w-full">
      <button onClick={toggleDrawer} className="active:scale-95">
        {showDrawer ? (
          <iconComponents.util.CancelIcon
            stroke="#000"
            width={24}
            height={24}
          />
        ) : (
          <iconComponents.util.MenuIcon stroke="#000" width={24} height={24} />
        )}
      </button>
      <div
        style={{
          display: showDrawer ? "block" : "none",
          transform: showDrawer ? "translateX(0)" : "translateX(150vw)",
        }}
        className="w-screen fixed top-12 left-0 right-0 z-30 bg-white max-h-screen  min-h-[calc(100vh_-_48px)] overflow-auto transition-transform"
      >
        <div className="py-4 px-6 w-full min-h-[calc(100vh_-_48px)]  flex flex-col">
          <nav className="w-full">
            <ul role="menu" className="flex flex-col justify-start py-2 gap-4">
              {menuOptions.map((el) => (
                <NavItem key={el.name} {...el} onClick={closeDrawer} />
              ))}
            </ul>
          </nav>
          <div className="flex-1 w-full flex justify-end flex-col gap-8 mb-10">
            <nav className="w-full flex-1 flex justify-end flex-col">
              <ul
                onClick={closeDrawer}
                role="menu"
                className="flex flex-col justify-end  gap-2"
              >
                <NavItem
                  icon={iconComponents.navigation.SettingsIcon}
                  name="Settings"
                  url={`/app/setting`}
                />
                <NavItem
                  icon={iconComponents.navigation.LogoutIcon}
                  name="Log out"
                  onClick={logoutHandler}
                />
              </ul>
            </nav>
            <UserInfo onClose={closeDrawer} />
          </div>
        </div>
      </div>
      <Modal
        variant="sm"
        open={isModalOpen}
        onClose={closeModal}
        className="!z-40"
      >
        <LogoutWarning onClose={closeModal} logoutAction={() => {}} />
      </Modal>
    </div>
  );
};

export default MobileMenu;
