import Typography from "@/common/Typography";
import clsx from "clsx";
import React, {
  forwardRef,
  HTMLAttributes,
  MutableRefObject,
  RefObject,
} from "react";
type Variant = "pending" | "inProgress" | "complete";
interface StatusProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: Variant | string;
}

const classesMap: Record<Variant, string> = {
  pending: "bg-expectoo-teal-100  border-expectoo-teal-100   !text-[#f7f7f7]",
  inProgress:
    "bg-expectoo-yellow-100 border-expectoo-yellow-100 text-expectoo-shades-black",
  complete:
    "bg-expectoo-green-100  border-expectoo-green-100   text-expectoo-shades-black",
};

const Status: React.FC<StatusProps> = ({ label, variant }) => {
  const variantClass = classesMap[variant as Variant] || classesMap["pending"];

  return (
    <div
      className={clsx(
        "bg-dash-shades-purple-3 h-[14px] rounded-[7px] px-[8px] py-[2px] border-[0.5px] border-dash-shades-purple-1 flex items-center justify-center",
        variantClass
      )}
    >
      <Typography
        as="p"
        className="text-[11px] font-[500] leading-[10px] text-expectoo-shades-black"
      >
        {label}
      </Typography>
    </div>
  );
};

export default Status;
