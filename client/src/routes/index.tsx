import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import DashboardLayout from "@/layouts/dashboard";
import AuthLayout from "@/layouts/auth";
import SignUp from "@/pages/auth/signup";
import SignIn from "@/pages/auth/signin";
import ProtectedRoutes from "./ProtectedRoutes";
const Dashboard = React.lazy(() => import("@/pages/dashboard"));
const TaskDetailPage = React.lazy(
  () => import("@/pages/dashboard/tasks/details/TaskDetailPage")
);
const AllTasksPage = React.lazy(() => import("@/pages/dashboard/tasks"));
const PendingTasksPage = React.lazy(
  () => import("@/pages/dashboard/tasks/pending")
);
const InProgressTaskPage = React.lazy(
  () => import("@/pages/dashboard/tasks/inProgress")
);
const CompletedTaskPage = React.lazy(
  () => import("@/pages/dashboard/tasks/completed")
);

const RouteConfig = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<div>App crash</div>}>
      <Route path="auth" element={<AuthLayout />}>
        <Route index element={<div>404 Not Found</div>} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
      <Route path="/" element={<Navigate to="/auth/sign-in" />} />
      <Route path="" element={<ProtectedRoutes />}>
        <Route path="app" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tasks">
            <Route index element={<AllTasksPage />} />
            <Route path=":id" element={<TaskDetailPage />} />
            <Route path="stage/pending" element={<PendingTasksPage />} />
            <Route path="stage/in-progress" element={<InProgressTaskPage />} />
            <Route path="stage/completed" element={<CompletedTaskPage />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

export default RouteConfig;
