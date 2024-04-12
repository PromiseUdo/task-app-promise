import { FC } from "react";

type BannerProps = {
  image: string;
};
const Banner: FC<BannerProps> = ({ image }) => {
  return (
    <div className=" h-screen relative overlay bg-white">
      <img
        className="w-full h-full  object-cover object-[100%_100%] "
        src={image}
        loading="lazy"
        alt="representation of page"
      />
    </div>
  );
};

export default Banner;
