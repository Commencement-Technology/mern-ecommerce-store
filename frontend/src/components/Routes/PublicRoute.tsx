import React, { ReactNode } from "react";

const PublicRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export default PublicRoute;
