import clsx from "clsx";
import React, {
  forwardRef,
  HTMLAttributes,
  MutableRefObject,
  RefObject,
} from "react";
// import MoonLoader from 'react-spinners/MoonLoader'
// import CircularProgress from '../spinners/CircularProgress'
// import LazySpinner from '../spinners/LazySpinner'

type Variant =
  | "primary"
  | "secondary"
  | "empty"
  | "hollow"
  | "cancel"
  | "outlined";
interface Props extends HTMLAttributes<HTMLButtonElement> {
  label?: React.ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
  delay?: number;
  variant?: Variant;
  btnRef?: RefObject<HTMLButtonElement>;
}

const classesMap: Record<Variant, string> = {
  primary:
    "bg-expectoo-teal-100 hover:bg-expectoo-teal-80 disabled:bg-expectoo-shades-gray-3 disabled:text-expectoo-gray-2 text-expectoo-shades-white",
  secondary: "",
  empty:
    "bg-expectoo-shades-white text-expectoo-teal-100 hover:text-expectoo-teal-80 disabled:text-expectoo-shades-gray-3",
  hollow:
    "h-[37px] px-4 py-1 gap-2 bg-[#CCECEF26] text-expectoo-teal-100 hover:text-expectoo-teal-80 disabled:text-expectoo-shades-gray-3",
  cancel: "bg-[#F7F7F7] text-expectoo-shades-black sm active:scale-95",
  outlined:
    "border border-[#E2E7E9] h-8 py-1 px-6 flex justify-center items-center sm",
};
function Button({
  label,
  className,
  loading,
  fullWidth,
  type = "button",
  delay = 300,
  variant = "primary",
  btnRef,
  ...rest
}: Props) {
  return (
    <button
      type={type}
      ref={btnRef}
      className={clsx(
        "flex sm font-semibold capitalize justify-center items-center  rounded h-12 gap-2  select-none whitespace-nowrap py-1 px-6",
        classesMap[variant],
        className ? className : "",
        fullWidth ? "w-full" : "w-auto",
        loading ? "!bg-expectoo-shades-white" : ""
      )}
      {...rest}
    >
      {/* {loading ? (
        <LazySpinner show={loading} delay={delay}>
          <CircularProgress size='18px' color='var(--teal-100)' />
        </LazySpinner>
      ) : (
        label
      )} */}
      {label}
    </button>
  );
}

export default Button;
