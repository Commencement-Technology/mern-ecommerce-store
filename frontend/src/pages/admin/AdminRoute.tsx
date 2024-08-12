import React from "react";
import { useAppSelector } from "../../hooks";
import { Navigate, Outlet } from "react-router-dom";

export const AdminRoute = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  return userInfo && userInfo?.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};
