import React from "react";

const OneBlogLayout = ({ children }: React.PropsWithChildren) => {
  return <div className="px-2 min-h-[calc(100dvh-48px)]">{children}</div>;
};

export default OneBlogLayout;
