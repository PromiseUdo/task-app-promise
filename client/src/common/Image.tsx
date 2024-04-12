import React, { AllHTMLAttributes } from "react";

interface ImageProps extends AllHTMLAttributes<HTMLImageElement> {
  defaultImage?: string;
}

const Image = (props: ImageProps) => {
  const { defaultImage, alt, src, ...rest } = props;
  return (
    <img
      alt={alt}
      src={src}
      onError={(() => {
        let count = 0;
        return (e) => {
          const target: any = e.target;
          if (!defaultImage || count > 0) return;
          target.src = defaultImage;
          e.currentTarget.src = defaultImage;
          count++;
        };
      })()}
      {...rest}
    />
  );
};

export default Image;
