import Title from "@/common/Title";
import RouteCrumbs from "@/common/breadcrumbs/RouteCrumbs";
import { useToggleState } from "@/hooks/useToggleState";
import Actions from "../components/Actions";
import TaskList from "../components/TaskList";
import CreateTask from "../components/CreateTask";
import { useGetTasksByStageQuery } from "@/store/tasksApiSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const NameMap = new Map();

const PendingTasksPage = () => {
  NameMap.set("/app/tasks/pending", `Pending Tasks`);
  const { user } = useSelector((state: any) => state.auth);

  const {
    data: tasks,
    isLoading,
    refetch: refetchTasks,
  } = useGetTasksByStageQuery({
    stage: "pending",
    userId: user._id,
  });
  const {
    state: showCreateTask,
    open: openCreateTask,
    close: closeCreateTask,
  } = useToggleState(false);

  const refreshTasks = async () => {
    try {
      await refetchTasks();
    } catch (error) {
      console.error("Error refreshing tasks:", error);
    }
  };
  return (
    <div className="w-full bg-expectoo-shades-bg px-6 pb-4 flex flex-col gap-4 justify-start items-start">
      <div className="flex justify-between items-center w-full">
        <RouteCrumbs nameMap={NameMap} />
        <Title>Expectask - All Tasks</Title>
        <Actions onCreateTask={openCreateTask} />
      </div>
      <div className="grid grid-cols-12 gap-4 w-full">
        <div className="w-full flex col-span-12 gap-8">
          <TaskList tasks={tasks} isLoading={isLoading} />
        </div>
      </div>
      <CreateTask
        open={showCreateTask}
        onClose={closeCreateTask}
        refetch={refreshTasks}
      />
    </div>
  );
};

export default PendingTasksPage;
