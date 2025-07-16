import React from "react";

const OneBlogLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="min-h-[calc(100dvh-64px)]">{children}</div>
  );
};

export default OneBlogLayout;
