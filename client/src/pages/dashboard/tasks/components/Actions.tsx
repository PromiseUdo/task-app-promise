import iconComponents from "@/assets/icons/iconComponents";
import Button from "@/common/button";
import { FC } from "react";
import { useNavigate, useNavigation } from "react-router";

const Actions: FC<{ onCreateTask: () => void }> = (props) => {
  const { onCreateTask } = props;
  const navigate = useNavigate();

  return (
    <div className="flex justify-end items-center gap-4">
      <Button
        onClick={onCreateTask}
        className="!w-auto !p-0"
        label={
          <span className="justify-center flex gap-4 items-center flex-nowrap w-auto py-1 px-4 xl:px-6">
            <iconComponents.util.AddCircleIcon stroke="white" />
            <span className="hidden uppercase sm:inline">Add Task</span>
          </span>
        }
      />
    </div>
  );
};

export default Actions;
