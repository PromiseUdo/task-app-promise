import clsx from "clsx";
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface NavItemProps {
  icon: React.ElementType;
  name: string;
  url?: string;
  showText?: boolean;
  onClick?: () => void;
}
const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  name,
  url,
  onClick,
}) => {
  const { pathname } = useLocation();

  const isActive = pathname.includes(
    url || Math.random().toString(16).substring(4, 10)
  );
  const innerElement = (
    <>
      <Icon />
      <span>{name}</span>
    </>
  );
  return !url ? (
    <li
      role="menuitem"
      onClick={onClick}
      className={clsx(
        "w-full cursor-pointer flex items-center py-2 gap-4 capitalize sm:flex-col sm:border-b-2 sm:pt-2 sm:pr-2 sm:pb-3 sm:pl-2 lg:flex-row lg:border-b-0",
        isActive ? "sm:border-[#00A0AE] lg:border-r" : "sm:border-transparent"
      )}
    >
      {innerElement}
    </li>
  ) : (
    <Link
      className="capitalize flex items-center gap-4 py-2 w-full sm:flex-col sm:border-b-2 rounded-sm md:flex-row sm:px-0.5"
      role="menuitem"
      to={url}
      onClick={() => {}}
    >
      {innerElement}
    </Link>
  );
};

export default NavItem;
