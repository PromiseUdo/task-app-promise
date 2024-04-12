import React, { useState } from "react";
import TaskCard from "./taskCard";
import { useSelector } from "react-redux";
import { Task, useGetTasksQuery } from "@/store/tasksApiSlice";
import { ClipLoader } from "react-spinners";
import EmptySection from "../../components/EmptySection";
import moment from "moment";
import CreateTask from "./CreateTask";
import { useToggleState } from "@/hooks/useToggleState";

interface TaskListProps {
  tasks?: Task[];
  isLoading: boolean;
}
const TaskList: React.FC<TaskListProps> = ({ tasks, isLoading }) => {
  const { user } = useSelector((state: any) => state.auth);
  const {
    state: showCreateTask,
    open: openCreateTask,
    close: closeCreateTask,
  } = useToggleState(false);

  return isLoading ? (
    <div className="w-screen h-screen flex justify-center items-center bg-white">
      <ClipLoader color="#00A0AE" loading size={75} />
    </div>
  ) : !tasks?.length ? (
    <>
      <EmptySection
        onCreate={openCreateTask}
        title="No Tasks Yet"
        subtext="You have no tasks here yet"
      />
      {/* <CreateTask open={showCreateTask} onClose={closeCreateTask} /> */}
    </>
  ) : (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
      {tasks?.map((task, idx) => (
        <TaskCard
          _id={task._id}
          title={task.title}
          stage={task.stage}
          completed={task.completed}
          created_at={task.created_at}
          description={task.description}
          dueDate={task.dueDate}
        />
      ))}
    </div>
  );
};

export default TaskList;
