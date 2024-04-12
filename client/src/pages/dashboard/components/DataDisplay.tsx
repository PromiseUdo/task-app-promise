import Typography from "@/common/Typography";

type IDisplay = {
  title: string;
  value: React.ReactNode;
};

const DataDisplay = (props: IDisplay) => {
  const { title, value } = props;
  return (
    <div className="flex flex-col justify-start gap-2 w-full items-start ">
      <Typography
        as="strong"
        className=" sm text-[14px] font-[500] leading-[180%] text-expectoo-shades-black"
      >
        {title}
      </Typography>
      <Typography
        as="span"
        className="font-normal text-[16px] leading-[180%] text-expectoo-shades-gray-2.5"
      >
        {value}
      </Typography>
    </div>
  );
};

export default DataDisplay;
