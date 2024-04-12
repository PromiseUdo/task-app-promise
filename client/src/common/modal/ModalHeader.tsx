import iconComponents from "@/assets/icons/iconComponents";
import React from "react";
import Typography from "../Typography";

type IModalHeader = {
  onClose?: () => void;
  title?: React.ReactNode;
  subText?: React.ReactNode;
};
const ModalHeader = (props: IModalHeader) => {
  const { onClose, title, subText } = props;
  return (
    <header className="flex flex-col justify-start items-start w-full pb-6">
      <div className="w-full flex justify-between items-center">
        <Typography
          as="h4"
          className="font-medium text-[22px] text-expectoo-shades-black"
        >
          {title}
        </Typography>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-sm hover:bg-[#f7f7f7] active:bg-[#f7f7f7] w-[28px] h-[28px] sm:w-[37px] sm:h-[37px]"
          >
            <iconComponents.util.CancelIcon
              width={24}
              height={24}
              stroke="var(--shades-black)"
            />
          </button>
        )}
      </div>
      {subText && (
        <Typography
          as="p"
          className="text-expectoo-shades-gray-2.5 text-sm font-normal pr-8"
        >
          {subText}
        </Typography>
      )}
    </header>
  );
};

export default ModalHeader;
