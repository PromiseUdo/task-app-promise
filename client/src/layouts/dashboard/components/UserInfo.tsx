import imagesUrl from "@/assets/images/imagesUrl";
import Typography from "@/common/Typography";
import clsx from "clsx";
import { forwardRef } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
const UserInfo = forwardRef<HTMLDivElement, { onClose?: () => void }>(
  (props, ref) => {
    const { user } = useSelector((state: any) => state.auth);
    const { onClose } = props;
    const navigate = useNavigate();

    return (
      <div
        ref={ref}
        className="w-full flex border-t border-expectoo-shades-gray-1 pt-6 gap-2.5 h-[62px] cursor-pointer items-center sm:pt-0 sm:border-none sm:w-auto sm:min-w-[130px] sm:justify-end lg:gap-2.5 lg:border-t lg:h-[62px] lg:p-6 lg:pb-0 lg:w-full lg:border-expectoo-shades-gray-1 lg:justify-start"
      >
        <div
          className={clsx(
            "w-8 h-8 rounded-full border flex justify-center items-center relative"
          )}
        >
          <img
            src={imagesUrl.DefaultUserImage}
            alt="Profile of User"
            className="w-8 h-8 object-cover rounded-full"
            onError={(e) => {
              e.currentTarget.src = "/defaultImage.png";
            }}
          />
          <span className="absolute w-2 h-2 right-0 bottom-0 bg-[#12B76a] rounded-full border border-expectoo-shades-white"></span>
        </div>
        <div className="flex flex-col justify-center items-start">
          <Typography
            as="strong"
            className="sm font-bold text-expectoo-shades-gray-4 capitalize whitespace-nowrap"
          >
            {user?.username}
          </Typography>
          <Typography
            as="span"
            className="xs font-normal text-expectoo-shades-gray-3 capitalize"
          >
            {"User"}
          </Typography>
        </div>
      </div>
    );
  }
);

UserInfo.displayName = "UserInfo";

export default UserInfo;
