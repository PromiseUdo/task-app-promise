import iconComponents from "@/assets/icons/iconComponents";
import React, {
  AllHTMLAttributes,
  HTMLAttributes,
  useEffect,
  useState,
} from "react";

interface ICheckbox extends AllHTMLAttributes<HTMLInputElement> {
  checkComponent?: React.ReactElement;
  uncheckedComponent?: React.ReactElement;
  indeterminate?: boolean;
}

function Checkbox(props: ICheckbox) {
  const {
    onChange,
    checked: passCheck,
    checkComponent,
    uncheckedComponent,
    indeterminate,
    ...rest
  } = props;
  const [checked, setChecked] = useState(passCheck);
  const changeHandler = (e: any) => {
    console.log(e.currentTarget.checked);
    setChecked(e.currentTarget.checked);
    onChange?.(e);
  };
  useEffect(() => {
    setChecked(passCheck);
  }, [passCheck]);

  return (
    <div className="cursor-pointer relative">
      <input
        type="checkbox"
        checked={checked}
        onChange={changeHandler}
        hidden
        {...rest}
        className="opacity-0 absolute h-8 w-8 outline-none border-none peer"
      />
      {checkComponent && uncheckedComponent ? (
        indeterminate ? (
          <iconComponents.util.IndeterminateIcon />
        ) : checked ? (
          checkComponent
        ) : (
          uncheckedComponent
        )
      ) : indeterminate ? (
        <iconComponents.util.IndeterminateIcon />
      ) : checked ? (
        <iconComponents.util.CheckedIcon />
      ) : (
        <iconComponents.util.UncheckedIcon />
      )}
    </div>
  );
}

export default Checkbox;
