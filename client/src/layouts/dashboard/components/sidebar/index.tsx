// import useLogout from "@/apis/hooks/useLogout";
import iconComponents from "@/assets/icons/iconComponents";
import Modal from "@/common/modal/Modal";
import { Storage } from "@/helpers/Storage";
import { useToggleState } from "@/hooks/useToggleState";
import { Link, useNavigate } from "react-router-dom";
import { useMenuItems } from "../../dashboard.hooks";
import LogoutWarning, { DONT_SHOW_LOGOUT_MODAL } from "../LogoutWarning";
import NavItem from "../NavItem";
import UserInfo from "../UserInfo";
import Logo from "@/common/logo";
import { useLogoutMutation } from "@/store/usersApiSlice";
import { useDispatch } from "react-redux";
import { clearCredentials } from "@/store/authSlice";

const Sidebar = () => {
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { menuItems } = useMenuItems();
  const {
    state: isModalOpen,
    open: openModal,
    close: closeModal,
  } = useToggleState(false);
  const dontShow = Storage.getItem(DONT_SHOW_LOGOUT_MODAL);
  const logout = async () => {
    try {
      await logoutApiCall({}).unwrap();
      dispatch(clearCredentials());
      navigate("/auth/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = () => {
    if (dontShow) {
      logout();
    } else {
      openModal();
    }
  };
  return (
    <>
      <div className="border-r border-expectoo-shades-gray-1 h-screen bg-expectoo-shades-white flex flex-col justify-start pt-8  px-0 gap-20 min-w-full">
        <Link
          to={`/app/dashboard`}
          className="active:scale-95 ml-[22px] mr-auto"
        >
          <Logo />
        </Link>
        <nav className="pl-8">
          <ul role="menu">
            {menuItems.map((menu) => (
              <NavItem {...menu} key={menu.name} />
            ))}
          </ul>
        </nav>
        <div className=" flex-1 w-full flex justify-end flex-col gap-8 mb-6">
          <nav className="w-full flex-1 flex justify-end flex-col pl-8">
            <ul role="menu" className="flex flex-col justify-end  gap-2">
              <NavItem
                icon={iconComponents.navigation.LogoutIcon}
                name="Logout"
                onClick={logoutHandler}
              />
            </ul>
          </nav>
          <UserInfo />
        </div>
      </div>
      <Modal variant="sm" open={isModalOpen} onClose={closeModal}>
        <LogoutWarning onClose={closeModal} logoutAction={logout} />
      </Modal>
    </>
  );
};

export default Sidebar;
