import { Link } from "react-router-dom";
import { useMenuItems } from "../../dashboard.hooks";
import MobileMenu from "./MobileMenu";
import TabletMenu from "./TabletMenu";
import Logo from "@/common/logo";
import UserInfo from "../UserInfo";

const Header = () => {
  const { menuItems } = useMenuItems();

  return (
    <>
      <header className="w-full min-w-0 flex justify-between px-5 py-2.5 items-center max-h-12 gap-[86px] sm:py-3 sm:px-8 sm:max-h-[76px] lg:max-h-[64px] lg:border-b border-b-expectoo-shades-gray-1 lg:justify-end ">
        <Link to={`/app/dashboard`} className="active:scale-95 lg:hidden">
          <Logo />
        </Link>
        <div className="hidden flex-1 sm:flex lg:hidden ">
          <TabletMenu menuOptions={menuItems} />
        </div>

        <div className="sm:hidden">
          <MobileMenu menuOptions={menuItems} />
        </div>
      </header>
    </>
  );
};

export default Header;
