import { useMemo } from "react";
import { MenuItem } from "./dashboard.types";
import { LuLayoutDashboard } from "react-icons/lu";

const MENU_ITEMS: MenuItem[] = [
  {
    icon: LuLayoutDashboard,
    name: "Dashboard",
    url: "/app/dashboard",
  },
  {
    icon: LuLayoutDashboard,
    name: "Tasks",
    url: "/app/tasks",
  },
  {
    icon: LuLayoutDashboard,
    name: "Pending Task",
    url: `/app/tasks/stage/pending`,
  },
  {
    icon: LuLayoutDashboard,
    name: "In Progress",
    url: `/app/tasks/stage/in-progress`,
  },
  {
    icon: LuLayoutDashboard,
    name: "Completed Task",
    url: "/app/tasks/stage/completed",
  },
];

export const useMenuItems = () => {
  const menuItems = useMemo<MenuItem[]>(() => {
    return (MENU_ITEMS || []).map((menuItem) => {
      return {
        ...menuItem,
      };
    });
  }, []);

  return {
    menuItems,
  } as const;
};
