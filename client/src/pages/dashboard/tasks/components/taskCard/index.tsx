import React from "react";
import iconComponents from "@/assets/icons/iconComponents";
import Typography from "@/common/Typography";
import Button from "@/common/button";
import DataDisplay from "../../../components/DataDisplay";
import useMediaQuery from "@/hooks/useMediaQuery";
import Modal from "@/common/modal/Modal";
import { useToggleState } from "@/hooks/useToggleState";
import Status from "./Status";
import ConfirmDelete from "./ConfirmDelete";
import ToggleSwitch from "@/common/input/ToggleSwitch";
import UpdateTask from "./UpdateTask";
import moment from "moment";
import { useDeleteTaskMutation } from "@/store/tasksApiSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export interface TaskCardProps {
  _id: string;
  title: string;
  stage: string;
  completed: boolean;
  created_at: string;
  dueDate: string;
  description: string;
}
const TaskCard: React.FC<TaskCardProps> = ({
  _id,
  title,
  stage,
  completed,
  created_at,
  dueDate,
  description,
}) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 800px)");
  const task = {
    _id,
    title,
    stage,
    completed,
    created_at,
    dueDate,
    description,
  };
  const {
    state: isModalOpen,
    open: openModal,
    close: closeModal,
  } = useToggleState(false);
  const {
    open: openUpdateTaskDetails,
    close: closeUpdateTaskDetails,
    state: showUpdateTaskDetails,
  } = useToggleState(false);
  const openConfirmModal = () => {
    openModal();
  };

  const navigate = useNavigate();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
  const deleteHandler = async () => {
    if (isDeleting) {
      return;
    }
    try {
      const res = await deleteTask({
        id: _id,
      }).unwrap();
      toast.success("Task deleted successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message);
      console.log(error);
    }
  };
  const id = _id;
  return (
    <div className=" border border-[#f1f3f4] bg-expectoo-shades-white rounded-[15px]   p-4  bg-dash-shades-gray-1 shadow  w-full h-full">
      <div className="h-full w-full flex flex-col gap-[8px]">
        <div className="flex w-full justify-end items-center">
          {/* <div className="flex items-center  gap-1">
            <ToggleSwitch
              activeColor="green"
              id={"complete"}
              // isChecked={JSON.parse(
              //   cell.value?.slice(0, cell.value?.indexOf(" "))
              // )}
              // onChange={handleToggleBlock.bind(
              //   null,
              //   Number(cell.value?.slice(cell.value?.indexOf(" ")))
              // )}
            />
            <Typography className="text-sm font-light">
              Mark as complete
            </Typography>
          </div> */}
          <Status variant={stage} label={stage} />
        </div>

        <div className="border-t border-expectoo-border pt-2 flex items-center gap-3">
          <Typography
            onClick={() => navigate(`/app/tasks/${id}`)}
            as="h5"
            className="sm:text-[18px] font-medium text-expectoo-shades-black hover:underline cursor-pointer "
          >
            {title}
          </Typography>
        </div>

        <Typography
          as="p"
          className="text-expectoo-shades-black font-normal max-w-full sm:pr-8 lg:pr-0 h-[55px] text-[14px] leading-[180%] overflow-hidden text-ellipsis "
        >
          {description.substring(0, isMobile ? 32 : isTablet ? 125 : 145) +
            (() => {
              if (isMobile) {
                return description.length > 32 ? "..." : "";
              } else if (isTablet) {
                return description.length > 125 ? "..." : "";
              } else {
                return description.length > 145 ? "..." : "";
              }
            })()}
        </Typography>

        <div className="flex items-center w-full  justify-between">
          <DataDisplay
            title="Created Date"
            value={moment.utc(created_at).format("YYYY-MM-DD")}
          />
          <DataDisplay
            title="Due Date"
            value={moment.utc(dueDate).format("YYYY-MM-DD")}
          />
        </div>

        <div className="flex items-center justify-end border-t pt-2 border-expectoo-border">
          <div className="flex  w-full h-full items-center justify-end gap-2">
            <Button
              variant="cancel"
              className="flex-1 !w-full md:w-auto items-center"
              label={
                <>
                  <span className="text-expectoo-blue-100">EDIT</span>
                  <iconComponents.util.EditIcon className="w-4 h-4  fill-expectoo-blue-100" />
                </>
              }
              onClick={openUpdateTaskDetails}
            />
            <Button
              variant="cancel"
              className="flex-1 !w-full md:w-auto items-center"
              label={
                <>
                  <span className="text-expectoo-red-500">DELETE</span>
                  <iconComponents.util.DeleteIcon className="fill-expectoo-red-500 w-4 h-4" />
                </>
              }
              onClick={openConfirmModal}
            />
          </div>
        </div>
      </div>
      <Modal
        variant="sm"
        open={isModalOpen}
        onClose={closeModal}
        className="!z-40"
      >
        <ConfirmDelete onClose={closeModal} deleteAction={deleteHandler} />
      </Modal>
      <UpdateTask
        open={showUpdateTaskDetails}
        onClose={closeUpdateTaskDetails}
        data={task}
      />
    </div>
  );
};

export default TaskCard;
