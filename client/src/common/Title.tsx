import React, { FC, useEffect } from "react";

const Title: FC<{ children: string }> = ({ children: title }) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
  return <></>;
};

export default Title;
