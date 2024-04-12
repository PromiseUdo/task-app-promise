import React, { HTMLAttributes } from "react";
// import "./Switch.css";

interface SwitchProperties extends HTMLAttributes<HTMLInputElement> {
  id: string;

  label?: string;

  "data-on"?: string;

  isChecked?: boolean;

  "data-off"?: string;

  description?: string;
  activeColor?: "blue" | "green" | "purple" | "orange" | "pink" | "red";
  inactiveColor?: string;
  disabled?: boolean;
}

const ToggleSwitch: React.FC<SwitchProperties> = (props) => {
  const {
    onChange: changeHandler,
    id,
    isChecked,
    inactiveColor = "#EEEEEE",
    activeColor = "blue",
    className,
    disabled,
    ...rest
  } = props;
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeHandler && changeHandler(event);
  };

  const labelId = `label-${id}`;
  const descriptionId = `description-${id}`;

  const labelBy = labelId + " " + descriptionId;

  return (
    <label htmlFor={id} className="flex items-start gap-1">
      <input
        style={{ transition: "background-color 0.3s, border-color 0.3s" }}
        className={`appearance-none w-[32px] h-[20px] m-0 relative cursor-pointer flex items-center justify-start 
        before:cursor-pointer z-10 before:rounded-full
        before:w-[20px] before:h-[20px] before:bg-white 
         before:transition-all before:duration-300
        after:content-[attr(data-off)] after:text-white after:block after:absolute after:text-[10px] after:text-center after:top-[0.45em] after:bottom-[0.45em] after:right-[0.4em]
        focus:outline focus:outline-2  focus:outline-offset-2 
        ${
          activeColor === "blue"
            ? "focus:outline-[var(--secondary-bg)] checked:bg-[var(--secondary-bg)] checked:border-[var(--secondary-bg)]"
            : ""
        }
        ${
          activeColor === "green"
            ? "focus:outline-[#FFF]   checked:bg-[#2fb574] checked:border-[#2fb574] checked:hover:bg-[#2fb574]"
            : ""
        }
        ${
          activeColor === "pink"
            ? "focus:outline-[var(--pink-dark)] checked:bg-[var(--pink-dark)] checked:border-[var(--pink-dark)]"
            : ""
        }
        ${
          activeColor === "orange"
            ? "focus:outline-[var(--orange-dark)] checked:bg-[var(--orange-dark)] checked:border-[var(--orange-dark)]"
            : ""
        }
        ${
          activeColor === "purple"
            ? "focus:outline-[var(--purple-dark)] checked:bg-[var(--purple-dark)] checked:border-[var(--purple-dark)]"
            : ""
        }
        ${
          activeColor === "red"
            ? "focus:outline-[#FFF] checked:bg-[#E65846] checked:border-[#E65846] checked:hover:bg-[#E65846] "
            : ""
        }
        checked:before:left-[unset] checked:before:translate-x-[11px]
        checked:after:content-[attr(data-on)] checked:after:left-[0.2em] checked:after:right-[unset]
        bg-[#EEEEEE] border-[#EEEEEE] border  select-none rounded-[32px]
         ${className || ""}`}
        id={id}
        type="checkbox"
        role="switch"
        checked={isChecked}
        onChange={onChange}
        aria-checked={isChecked}
        aria-labelledby={labelBy}
        disabled={disabled}
        {...rest}
      />
      <div className="flex flex-col gap-1">
        <span
          id={labelId}
          className="cursor-pointer select-none leading-[1.4] text-base"
        >
          {props.label}
        </span>
        {props.description && (
          <p
            className="text-sm tracking-[0.4px] leading-[1.3] text-point-secondary-text"
            id={descriptionId}
          >
            {props.description}
          </p>
        )}
      </div>
    </label>
  );
};

ToggleSwitch.defaultProps = {
  // "data-on": "ON",
  // "data-off": "OFF",
  activeColor: "blue",
  inactiveColor: "#EEEEEE",
};

export default ToggleSwitch;
