import { ReactNode, FC } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";

const PrivateRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const { userInfo } = useAppSelector((state) => state.auth);

  // If userInfo isn't present, navigate to the login page
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // If userInfo is present, render the children
  return <>{children}</>;
};

export default PrivateRoute;
