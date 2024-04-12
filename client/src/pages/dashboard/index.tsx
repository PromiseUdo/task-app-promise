import Title from "@/common/Title";
import RouteCrumbs from "@/common/breadcrumbs/RouteCrumbs";
import TaskList from "./tasks/components/TaskList";
import StatCard from "./components/StatCard";
import {
  useGetTasksByStageQuery,
  useGetTasksQuery,
} from "@/store/tasksApiSlice";
import { useSelector } from "react-redux";
const NameMap = new Map();

const Dashboard = () => {
  NameMap.set("/app/dashboard/", `Dashboard`);
  const { user } = useSelector((state: any) => state.auth);

  const { data: allTasks, isLoading: allLoading } = useGetTasksQuery({
    userId: user._id,
  });
  const { data: pending, isLoading: pendingLoading } = useGetTasksByStageQuery({
    stage: "pending",
    userId: user._id,
  });
  const { data: inProgress, isLoading: inProgressLoading } =
    useGetTasksByStageQuery({
      stage: "inProgress",
      userId: user._id,
    });
  const { data: completed, isLoading: completeLoading } =
    useGetTasksByStageQuery({
      stage: "complete",
      userId: user._id,
    });

  return (
    <div className="w-full bg-expectoo-shades-bg px-6 pb-4 flex flex-col gap-4 justify-start items-start">
      <div className="flex justify-between items-center w-full">
        <RouteCrumbs nameMap={NameMap} />
        <Title>Expectask - Dashboard</Title>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="All Tasks"
          count={`${allTasks?.length || 0}`}
          url="/app/tasks"
          color="#5a6d72"
        />
        <StatCard
          title="Pending"
          count={`${pending?.length || 0}`}
          url="/app/tasks/stage/pending"
          color="#00a0ae"
        />
        <StatCard
          title="In Progress"
          count={`${inProgress?.length || 0}`}
          url="/app/tasks/stage/in-progress"
          color="#de9d60"
        />
        <StatCard
          title="Completed"
          count={`${completed?.length || 0}`}
          url="/app/tasks/stage/completed"
          color="#2fb574"
        />
      </div>
    </div>
  );
};

export default Dashboard;
