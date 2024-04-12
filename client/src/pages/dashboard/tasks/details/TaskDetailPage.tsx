import Title from "@/common/Title";
import useQueryParams from "@/hooks/useQueryParams";
import { useParams } from "react-router";
import TaskDetail from "./TaskDetail";
import RouteCrumbs from "@/common/breadcrumbs/RouteCrumbs";
import { useGetTaskQuery } from "@/store/tasksApiSlice";

const NameMap = new Map();
NameMap.set(`/app/tasks`, "Tasks");

const TaskDetailPage = () => {
  const { id, title: taskName } = useParams(); // Retrieve task name from URL params
  // const { id: taskId } = useQueryParams();
  // console.log(taskId, taskName);
  const { data: task } = useGetTaskQuery({ id });

  NameMap.set(`/app/tasks/${id}`, `${task?.title || ""}`);

  return (
    <div className="w-full bg-expectoo-shades-bg px-6 pb-4 flex flex-col gap-4 justify-start items-start">
      <div className="flex justify-between items-center w-full">
        <RouteCrumbs nameMap={NameMap} />
        <Title> Expectask - Task Detail</Title>
      </div>
      <div className="max-h-screen h-screen  w-full shadow-[0px_1px_2px_0px_#1018280D] flex flex-col items-start bg-expectoo-shades-white rounded-lg">
        <TaskDetail className="mb-4" task={task} />
      </div>
    </div>
  );
};

export default TaskDetailPage;
