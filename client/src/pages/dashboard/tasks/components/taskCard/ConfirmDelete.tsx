import Button from "@/common/button";
import Checkbox from "@/common/input/CheckBox";
import ModalHeader from "@/common/modal/ModalHeader";
import Typography from "@/common/Typography";
import { FC, useState } from "react";

const ConfirmDelete: FC<{
  onClose: () => void;
  deleteAction: () => void;
}> = ({ onClose, deleteAction }) => {
  return (
    <div className="py-7 w-full px-7 flex flex-col gap-10 z-30">
      <ModalHeader title="Delete Task?" onClose={onClose} />
      <div className="flex flex-col gap-4 justify-start items-start">
        <Typography
          as="p"
          className="text-expectoo-shades-black font-light  text-[16px]"
        >
          Are you sure you want to delete?
        </Typography>
      </div>
      <div className="flex justify-start items-center gap-2.5">
        <Button
          onClick={deleteAction}
          className="capitalize min-w-[160px] px-3 md whitespace-nowrap"
          label="Yes, Continue"
        />
        <Button
          variant="cancel"
          onClick={onClose}
          className="capitalize w-[190px] px-2 text-base bg-[#F7F7F7] text-point-primary-text whitespace-nowrap"
          label="Cancel"
        />
      </div>
    </div>
  );
};

export default ConfirmDelete;
