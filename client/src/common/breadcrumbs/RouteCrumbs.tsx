import iconComponents from "@/assets/icons/iconComponents";
import useGetCssValue from "@/hooks/useGetCssValue";
import clsx from "clsx";
import React, { AllHTMLAttributes, FC } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import Typography from "../Typography";
import { useCrumbs } from "./useCrumbs";

/**
 *
 * @param {object} nameMap The Route to the display name map
 * @returns
 */
interface ICrumbs extends AllHTMLAttributes<HTMLElement> {
  separator?: React.ReactNode;
  maxItems?: number;
  nameMap: Map<string, string>;
  ignoreCount?: number;
}

const RouteCrumbs: FC<ICrumbs> = ({
  maxItems,
  separator = "/",
  nameMap,
  ignoreCount = 2,
  style,
}) => {
  const navigate = useNavigate();
  const [crumbs, reverseMap] = useCrumbs(nameMap, ignoreCount);
  const [parentRef, parentWidth] = useGetCssValue("width", "100px");

  return crumbs.length === 1 ? (
    <div
      ref={parentRef}
      className="flex flex-1 justify-start items-center gap-1"
    >
      <span className="w-0.5 h-9 bg-expectoo-teal-100 rounded-lg"></span>
      <Typography
        as="span"
        className="md sm:h4 lg:text-[28px] !capitalize lg:leading-[40px] text-expectoo-shades-black font-semibold sm:font-medium "
      >
        {crumbs[0]}
      </Typography>
    </div>
  ) : (
    <div
      ref={parentRef}
      className="flex flex-1 justify-start items-center gap-1 overflow-hidden text-ellipsis"
    >
      {crumbs.map((pathName, idx) =>
        idx === 0 ? (
          <div
            key={pathName}
            className="flex justify-start items-center gap-1 cursor-pointer"
            onClick={() => navigate(reverseMap.get(pathName)!)}
          >
            <iconComponents.util.ArrowLeftIcon className="stroke-expectoo-shades-gray-2 w-6 h-6" />
            <Typography
              as="span"
              className="md sm:h4 lg:text-[28px] capitalize lg:leading-[40px] text-expectoo-shades-gray-2 hover:text-expectoo-shades-black font-semibold sm:font-medium "
            >
              {parseInt(parentWidth) > window.innerWidth ? "..." : crumbs[0]}
            </Typography>
          </div>
        ) : (
          <div
            key={pathName}
            onClick={() =>
              idx === crumbs.length - 1
                ? null
                : navigate(reverseMap.get(pathName)!)
            }
            className="flex justify-start items-center gap-1 cursor-pointer"
          >
            <span
              className={clsx(
                "w-0.5 h-9  rounded-lg",
                idx === crumbs.length - 1
                  ? "bg-expectoo-teal-100"
                  : "bg-expectoo-shades-gray-2"
              )}
            ></span>
            <Typography
              as="span"
              className={clsx(
                "md sm:h4 lg:text-[28px] lg:leading-[40px]  hover:text-expectoo-shades-black  font-semibold sm:font-medium max-w-[147px] md:max-w-[205px] lg:max-w-[362px] whitespace-nowrap overflow-hidden text-ellipsis",
                idx === crumbs.length - 1
                  ? "text-expectoo-shades-black"
                  : "text-expectoo-shades-gray-2"
              )}
            >
              {crumbs[idx]}
            </Typography>
          </div>
        )
      )}
    </div>
  );
};

export default RouteCrumbs;
