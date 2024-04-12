import iconComponents from "@/assets/icons/iconComponents";
import Typography from "@/common/Typography";
import Button from "@/common/button";
import React from "react";
import { useNavigate } from "react-router-dom";

type IEmpty = {
  title: string;
  subtext: string;
  onCreate: () => void;
};
const EmptySection: React.FC<IEmpty> = ({ title, subtext, onCreate }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[55vh] w-full h-full flex justify-center items-center flex-col bg-white rounded-lg self-stretch gap-6">
      <iconComponents.util.EmptyPageIcon className="w-[140px] h-[110px]" />
      <div className="flex flex-col gap-1 justify-center items-center">
        <Typography as="h5" className="text-expectoo-shades-black">
          {title}
        </Typography>
        <Typography
          as="p"
          className="sm text-expectoo-shades-gray-2.5 font-normal w-fu; text-center"
        >
          {subtext}
        </Typography>
      </div>
      <Button
        onClick={() => {
          onCreate();
        }}
        label="Create New Task"
        className="!uppercase !font-medium"
      />
    </div>
  );
};

export default EmptySection;
