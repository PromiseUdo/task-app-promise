import useMediaQuery from "@/hooks/useMediaQuery";
import { Outlet } from "react-router-dom";

import Header from "./components/header";
import Sidebar from "./components/sidebar";

type DashboardLayoutProps = {};

const DashboardLayout = (props: DashboardLayoutProps) => {
  const isLaptop = useMediaQuery("(min-width: 1024px)");

  return (
    <div
      className={
        "grid h-screen grid-rows-[4rem_minmax(50px,_1fr)] grid-cols-1 sm:grid-cols-[13rem_minmax(100px,_1fr)] xl:grid-cols-[18rem_minmax(100px,_1fr)] relative bg-expectoo-shades-bg w-full  max-w-[100vw] overflow-x-hidden"
      }
    >
      <div className="z-20 col-span-1 col-start-1 md:col-span-2 lg:col-start-2 lg:col-span-1 row-span-1 row-start-1 fixed top-0 left-0 right-0 w-full  bg-expectoo-shades-white max-w-[100vw]  ">
        <Header />
      </div>
      {isLaptop && (
        <aside className="hidden static row-start-1 row-span-2 lg:flex flex-col lg:fixed top-0 left-0 lg:w-[13rem] xl:w-[18rem] z-20">
          <Sidebar />
        </aside>
      )}
      <main className="col-span-1 col-start-1 sm:col-span-2  lg:col-start-2 lg:col-span-1 row-span-1 row-start-2 py-6 bg-expectoo-shades-bg  overflow-y-auto max-w-[100vw] overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};
export default DashboardLayout;
