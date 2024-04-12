import Button from "@/common/button";
import Checkbox from "@/common/input/CheckBox";
import ModalHeader from "@/common/modal/ModalHeader";
import Typography from "@/common/Typography";
import { Storage } from "@/helpers/Storage";
import { FC, useState } from "react";
import { useLogoutMutation } from "@/store/usersApiSlice";
import { clearCredentials } from "@/store/authSlice";

export const DONT_SHOW_LOGOUT_MODAL = "DONT_SHOW_LOGOUT_MODAL";
const LogoutWarning: FC<{
  onClose: () => void;
  logoutAction: () => void;
}> = ({ onClose, logoutAction }) => {
  const [dontShowPassword, setDontShowPassword] = useState(
    Boolean(Storage.getItem(DONT_SHOW_LOGOUT_MODAL))
  );
  const dontShowHandler = (checked: boolean) => {
    Storage.setItem(DONT_SHOW_LOGOUT_MODAL, checked);
    setDontShowPassword(checked);
  };
  return (
    <div className="py-7 w-full px-7 flex flex-col gap-10 z-30">
      <ModalHeader title="Log Out?" onClose={onClose} />
      <div className="flex flex-col gap-4 justify-start items-start">
        <Typography
          as="p"
          className="text-expectoo-shades-black font-light  text-[16px]"
        >
          Are you sure you want to Log out?
        </Typography>
        <div className="flex justify-start items-center gap-2 cursor-pointer">
          <Checkbox
            id="remember"
            checked={dontShowPassword}
            onChange={(e) => dontShowHandler(e.currentTarget.checked)}
          />
          <label htmlFor="remember" className="font-light sm -mt-2">
            Don&apos; show again
          </label>
        </div>
      </div>
      <div className="flex justify-start items-center gap-2.5">
        <Button
          onClick={logoutAction}
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

export default LogoutWarning;
