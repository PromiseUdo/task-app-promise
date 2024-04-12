import iconComponents from "@/assets/icons/iconComponents";
import useGetCssValue from "@/hooks/useGetCssValue";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import clsx from "clsx";
import React, {
  FC,
  HTMLAttributes,
  MouseEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
} from "react";

interface ISelectInput extends HTMLAttributes<HTMLSelectElement> {
  optionsValue?: (item: any) => string;
  optionsText?: (item: any) => React.ReactNode;
  options: any[];
  name?: string;
  fullWidth?: boolean;
  error?: string;
  value?: string;
  minWidth?: string;
  menuClassName?: string;
  disabled?: boolean;
  placeholder?: string;
}
const SelectInput: FC<ISelectInput> = ({
  placeholder,
  optionsValue,
  optionsText,
  options,
  onChange,
  name,
  id,
  className,
  menuClassName,
  fullWidth,
  error,
  value,
  minWidth,
  disabled,
  ...rest
}) => {
  const [menuTopPosition, setMenuTopPosition] = useState(48);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selected, setSelected] = useState(() =>
    placeholder
      ? typeof options[0] === "string"
        ? placeholder
        : (() => {
            const option = options[0];
            if (!option) return placeholder;
            const foundLabelKey = Object.keys(option).find((key: string) => {
              return optionsText?.(option) === option[key];
            });
            const foundValueKey = Object.keys(option).find((key: string) => {
              return optionsValue?.(option) == option[key];
            });
            if (foundLabelKey && foundValueKey)
              return {
                [foundLabelKey]: placeholder,
                [foundValueKey]: "",
              };
            return {
              label: placeholder,
              value: "",
            };
          })()
      : options[0]
  );
  const valueMap = useMemo(() => {
    const map: Record<string, any> = {};
    for (let opt of options) {
      if (optionsValue) {
        map[optionsValue(opt)] = opt;
      } else {
        map[opt] = opt;
      }
    }

    return map;
  }, [options.length]);

  // const menuRef = useRef<HTMLUListElement>(null)
  const outerRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  anchorRef.current = anchorEl;
  const clickHandler: MouseEventHandler = (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget as HTMLButtonElement);
  };
  const [menuRefEle, menuHeight] = useGetCssValue(
    "height",
    "350px",
    Boolean(anchorEl)
  );
  useOutsideClick([anchorRef, menuRefEle], () => setAnchorEl(null));

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      if (anchorEl) {
        const menu = menuRefEle.current;

        for (let opt = 0; opt < options.length; opt++) {
          if (menu?.children[opt]) {
            menu.children[opt].dispatchEvent(
              new MouseEvent("mouseleave", { bubbles: true })
            );
          }
          if (
            (optionsText && typeof optionsText(options[opt]) === "string"
              ? optionsText(options[opt])
              : options[opt]
            )
              .toLowerCase()
              .startsWith(e.key.toLowerCase())
          ) {
            menu?.children[opt]?.scrollIntoView(true);
            if (menu?.children[opt]) {
              menu.children[opt].focus();
              menu.children[opt].dispatchEvent(
                new MouseEvent("mouseover", { bubbles: true })
              );
              menu.children[opt].dispatchEvent(
                new MouseEvent("mouseenter", { bubbles: true })
              );
            }
          }
        }
      }
    };
    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [anchorEl]);

  useEffect(() => {
    if (value && options.length) {
      setSelected(valueMap[value]);
    }
  }, [value, valueMap]);

  useEffect(() => {
    const heightFromTop =
      outerRef.current && outerRef.current.getBoundingClientRect().top;
    if (!heightFromTop || !Boolean(anchorEl)) return;
    if (parseInt(menuHeight) + heightFromTop + 48 > window.innerHeight) {
      setMenuTopPosition(-parseInt(menuHeight));
    } else {
      setMenuTopPosition(48);
    }
  }, [anchorEl, menuHeight]);

  return (
    <div ref={outerRef} className="relative min-w-max">
      <button
        disabled={disabled}
        type="button"
        onClick={clickHandler}
        id={id}
        className={clsx(
          `flex-1 flex justify-between items-center rounded text-expectoo-shades-black  h-12 py-2 px-4 disabled:fill-[#666] disabled:bg-[#fafafa] disabled:text-[#666] gap-3 !tracking-normal`,
          className ? className : "",
          fullWidth ? "w-full" : "",
          error ? "border border-expectoo-red-500" : "",
          (optionsText ? optionsText(selected) : selected) === placeholder
            ? "text-[#979797]"
            : ""
        )}
      >
        <span>{optionsText ? optionsText(selected) : selected}</span>
        <svg
          role="button"
          style={{
            transform: Boolean(anchorEl) ? "rotate(180deg)" : "rotate(0deg)",
          }}
          onClick={(e) => {
            if (disabled) return;
            if (anchorEl) e.stopPropagation();
            setAnchorEl(null);
          }}
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="inherit"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.170067 0.87954C0.376209 0.673398 0.698787 0.654658 0.926099 0.823319L0.991223 0.87954L6 5.88805L11.0088 0.87954C11.2149 0.673398 11.5375 0.654658 11.7648 0.823319L11.8299 0.87954C12.0361 1.08568 12.0548 1.40826 11.8862 1.63557L11.8299 1.7007L6.41058 7.12005C6.20444 7.32619 5.88186 7.34493 5.65455 7.17627L5.58942 7.12005L0.170067 1.7007C-0.056689 1.47394 -0.056689 1.1063 0.170067 0.87954Z"
            fill="inherit"
          />
        </svg>
        {/* <DropdownIcon stroke="inherit" fill="inherit" /> */}
      </button>
      {error && <small className="text-expectoo-red-500">{error}</small>}
      {Boolean(anchorEl) && (
        <ul
          style={{
            top: `${menuTopPosition}px`,
          }}
          ref={menuRefEle}
          className={`flex-col items-center justify-start bg-point-white rounded-lg shadow-sm 
          pb-1
          pt-2.5 absolute left-0 z-30 mr-3 overflow-auto w-max h-max max-h-[350px] ${
            Boolean(anchorEl) ? "flex" : "hidden"
          } ${menuClassName || ""}`}
        >
          {placeholder && (
            <li
              className={`p-2.5 w-full cursor-pointer whitespace-nowrap relative z-40 left hover:bg-expectoo-teal-80 hover:text-expectoo-shades-white`}
              role="menuitem"
              onClick={(e) => {
                setSelected(() =>
                  typeof options[0] === "string"
                    ? placeholder
                    : (() => {
                        const option = options[0];
                        if (!option) return placeholder;
                        const foundLabelKey = Object.keys(option).find(
                          (key: string) => {
                            return optionsText?.(option) === option[key];
                          }
                        );
                        const foundValueKey = Object.keys(option).find(
                          (key: string) => {
                            return optionsValue?.(option) == option[key];
                          }
                        );
                        if (foundLabelKey && foundValueKey)
                          return {
                            [foundLabelKey]: placeholder,
                            [foundValueKey]: "",
                          };
                        return {
                          label: placeholder,
                          value: "",
                        };
                      })()
                );
                onChange?.({
                  target: { name, value: "" },
                  currentTarget: { name, value: "" },
                } as any);
                setAnchorEl(null);
              }}
            >
              {placeholder}
            </li>
          )}
          {options.map((option, index) => {
            return (
              <li
                style={{ minWidth: minWidth || "180px" }}
                key={index}
                className={`p-2.5 text-expectoo-shades-black w-full cursor-pointer whitespace-nowrap relative z-40 left hover:text-expectoo-shades-white hover:bg-expectoo-teal-80  flex justify-between items-center gap-5
                 ${
                   (optionsValue ? optionsValue(option) : option) ===
                   (optionsValue ? optionsValue(selected) : selected)
                     ? "!bg-expectoo-teal-100 !text-expectoo-shades-white"
                     : ""
                 } ${
                  options.length > 20 && index === options.length - 1 ? "" : ""
                }`}
                role="menuitem"
                onMouseEnter={(e) => {
                  e.currentTarget.classList.add("bg-expectoo-teal-80");
                  e.currentTarget.classList.add("text-expectoo-shades-white");
                }}
                onMouseOver={(e) => {
                  e.currentTarget.classList.add("bg-expectoo-teal-80");
                  e.currentTarget.classList.add("text-expectoo-shades-white");
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.classList.remove("bg-expectoo-teal-80");
                  e.currentTarget.classList.remove(
                    "text-expectoo-shades-white"
                  );
                }}
                onClick={(e) => {
                  setSelected(option);
                  onChange?.({
                    target: {
                      name,
                      value: optionsValue ? optionsValue(option) : option,
                    },
                    currentTarget: {
                      name,
                      value: optionsValue ? optionsValue(option) : option,
                    },
                  } as any);
                  setAnchorEl(null);
                }}
              >
                {optionsText ? optionsText(option) : option}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

interface IMenu extends HTMLAttributes<HTMLDivElement> {
  variant: "default" | "static";
  open: boolean;
  anchorEl: React.ReactNode;
  onClose: () => void;
}

export const Menu = forwardRef<HTMLDivElement, IMenu>(
  (
    {
      className,
      anchorEl,
      open,
      onClose,
      children,
      variant = "default",
      ...props
    },
    ref
  ) => {
    const innerRef = useRef<any>(null);
    const anchorRef = useRef<any>(null);
    anchorRef.current = anchorEl;
    useOutsideClick([innerRef, anchorRef], onClose);
    useEffect(() => {
      if (!open) {
        innerRef.current.style.display = "none";
        return;
      }
      const rect = (anchorEl as any)?.getBoundingClientRect?.();
      const top = rect.top + window.scrollY + rect.height + 10;
      const left = rect.left + window.scrollX;
      const right = rect.right + window.scrollX;

      innerRef.current.style.top = `${top}px`;
      innerRef.current.style.left = `${left}px`;

      if (left > (window.innerWidth * 55) / 100) {
        innerRef.current.style.left = `${
          right -
          (parseFloat(innerRef.current.getBoundingClientRect().width) || 200)
        }px`;
      }
      innerRef.current.style.display = open ? "flex" : "none";
    }, [anchorEl, open]);
    return (
      <div ref={ref}>
        <div
          ref={innerRef}
          role="menu"
          className={`flex-col items-center justify-start bg-point-white rounded-lg shadow-sm 

          pt-2.5 fixed top-0 left-0 z-30 mr-3 overflow-auto w-max h-max max-h-[400px] ${
            open ? "flex" : "hidden"
          } ${className || ""} ${variant}`}
          {...props}
        >
          {children}
        </div>
      </div>
    );
  }
);

Menu.displayName = "Menu";

interface IMenuItem extends HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
}
export const MenuItem: FC<IMenuItem> = ({
  children,
  className,
  checked,
  ...props
}) => {
  return (
    <div
      className={`p-2.5 w-full cursor-pointer whitespace-nowrap relative z-40 left hover:bg-point-input-bg hover:text-point-primary-text  ${
        className || ""
      } ${checked ? "bg-point-blue text-white" : ""}`}
      {...props}
      role="menuitem"
    >
      {children}
    </div>
  );
};

export default SelectInput;
