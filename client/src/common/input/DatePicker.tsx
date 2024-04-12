"use client";

import useGetCssValue from "@/hooks/useGetCssValue";
import React, { AllHTMLAttributes, FC, forwardRef } from "react";

interface IProps extends AllHTMLAttributes<HTMLInputElement> {
  id: string;
  error?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  left?: React.ReactNode;
  right?: React.ReactNode;
  style?: React.CSSProperties;
  height?: string;
  className?: string;
  name?: string;
}
const DatePicker = forwardRef<HTMLInputElement, IProps>(
  (
    {
      id,
      left,
      right,
      onChange,
      placeholder,
      className,
      height,
      name,
      error,
      style,
      disabled,
      required,
      ...rest
    },
    ref
  ) => {
    const [leftContainer, leftWidth] = useGetCssValue("width", "16px", left);
    const [rightContainer, rightWidth] = useGetCssValue("width", "16px", right);
    const extraWidth =
      (left ? parseFloat(leftWidth) : 0) + (right ? parseFloat(rightWidth) : 0);
    return (
      <div className="flex-1 flex flex-col gap-1 z-10 w-full ">
        <div
          className={
            "w-full flex items-center py-0 rounded bg-[#F1F3F4] border border-slate-300 focus-within:border-expectoo-border" +
            (error ? " !border-expectoo-primary border-solid  " : "") +
            (height ? `h-[${height}]` : "h-[53px]")
          }
          style={style}
        >
          {left && <span ref={leftContainer}>{left}</span>}
          <input
            placeholder={placeholder}
            autoComplete="off"
            id={id}
            disabled={disabled}
            onChange={onChange}
            ref={ref}
            name={name}
            style={{
              maxWidth: `calc(100% - ${extraWidth + 16}px)`,
            }}
            {...rest}
            className={`appearance-none max-h-full focus:outline-none outline-none active:outline-none  flex-1 border-none md px-4 py-3 text-expectoo-shades-black placeholder-expectoo-dark-teal-60 bg-[#F1F3F4]  ${
              className ? className : ""
            } ${
              left || right
                ? "rounded-none focus:outline-none active:outline-none"
                : "rounded"
            }`}
            type={"date"}
          />
          {right && <span ref={rightContainer}>{right}</span>}
        </div>
        <small className="text-expectoo-primary z-10">{error}</small>
      </div>
    );
  }
);
DatePicker.displayName = "InputWithAdornment";
export default DatePicker;
