import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import React from "react";

const ProtectedRoutes = () => {
  const { user } = useSelector((state: any) => state.auth);

  return user ? <Outlet /> : <Navigate to="/auth/sign-in" replace />;
};

export default ProtectedRoutes;
