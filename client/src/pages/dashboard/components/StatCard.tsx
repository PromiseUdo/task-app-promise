import Typography from "@/common/Typography";
import useMediaQuery from "@/hooks/useMediaQuery";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export interface StatCardProps {
  title: string;
  count: string;
  url: string;
  color: string;
}
const StatCard: React.FC<StatCardProps> = ({ title, count, url, color }) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 800px)");

  const navigate = useNavigate();

  return (
    <div
      className={clsx(
        " border border-[#f1f3f4] bg-expectoo-shades-white rounded-[15px] p-4  bg-dash-shades-gray-1 shadow  w-full h-full"
      )}
      style={{
        background: `${color}`,
      }}
    >
      <div className="h-full w-full flex flex-col gap-[8px]">
        <div className="flex w-full justify-between items-center"></div>

        <div className="border-t border-expectoo-border pt-2 flex items-center gap-3">
          <Typography
            as="h5"
            className="sm:text-[20px] font-[400] text-expectoo-shades-black hover:underline cursor-pointer "
          >
            {title}
          </Typography>
        </div>

        <Typography
          as="p"
          className="text-expectoo-shades-black font-normal max-w-full sm:pr-8 lg:pr-0 h-[55px] text-[24px] leading-[180%] overflow-hidden text-ellipsis "
        >
          {count}
        </Typography>

        <div className="flex items-center justify-end border-t pt-2 border-expectoo-border">
          <Typography
            onClick={() => navigate(url)}
            className="cursor-pointer hover:underline"
          >
            See list
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
