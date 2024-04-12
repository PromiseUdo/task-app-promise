import clsx from "clsx";
import React from "react";

type Props = {
  label?: React.ReactNode;
  id: string;
  subtext?: React.ReactNode;
  children: any;
  className?: string;
  required?: boolean;
};
function FormGroup({
  children,
  label,
  id,
  subtext,
  className,
  required,
}: Props) {
  return (
    <div
      className={clsx(
        "sm sm:md focus-within:text-expectoo-gray-800 flex flex-col text-expectoo-shades-gray-2.5 active:text-expectoo-gray-800 gap-2 w-full",
        className
      )}
    >
      <div className="w-full flex justify-between items-center md">
        <label htmlFor={id}>
          {label} {required && <span className="text-[#F04438]">*</span>}
        </label>
        <span className="text-xs font-light leading-5">{subtext}</span>
      </div>
      {React.cloneElement(children, {
        id,
      })}
    </div>
  );
}

export default FormGroup;
