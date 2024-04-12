import Typography from "@/common/Typography";
import clsx from "clsx";
import DataDisplay from "../../components/DataDisplay";
import ToggleSwitch from "@/common/input/ToggleSwitch";
import iconComponents from "@/assets/icons/iconComponents";
import { useToggleState } from "@/hooks/useToggleState";
import Modal from "@/common/modal/Modal";
import ConfirmDelete from "../components/taskCard/ConfirmDelete";
import UpdateTask from "../components/taskCard/UpdateTask";
import {
  Task,
  useDeleteTaskMutation,
  useGetTaskQuery,
} from "@/store/tasksApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import toast from "react-hot-toast";
const TaskDetail = (props: { className?: string; task: Task }) => {
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
  const confirmDelete = () => {
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
        id: props?.task._id,
      }).unwrap();
      toast.success("Task deleted successfully!");
      navigate("/app/tasks");
    } catch (error: any) {
      toast.error(error?.data?.message);
      console.log(error);
    }
  };

  return (
    <section
      className={clsx(
        "w-full flex flex-1  items-start gap-2.5 p-[16px_4px_0px_16px] overflow-y-auto  scrollbar scrollbar-w-1 scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg scrollbar-thumb-expectoo-dark-teal-80 scrollbar-track-expectoo-shades-white",
        props.className || ""
      )}
    >
      <div className="w-full flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
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
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={openUpdateTaskDetails}
              type="button"
              className="p-2"
            >
              <iconComponents.util.EditIcon className="stroke-expectoo-shades-gray-2.5 w-4 h-4" />
            </button>
            <button onClick={confirmDelete} type="button" className="p-2">
              <iconComponents.util.DeleteIcon className="fill-expectoo-red-500 w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="max-w-lg flex flex-col ">
          <div className="flex items-center gap-1">
            <div className="rounded-full bg-expectoo-shades-black h-2 w-2"></div>
            <Typography className="!uppercase font-medium text-[14px]">
              {props?.task?.stage}
            </Typography>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Typography className="text-[18px] font-semibold">
            Description
          </Typography>
          <Typography className="text-[14px] text-expectoo-shades-gray-2.5">
            {props?.task?.description}
          </Typography>
        </div>
        <div className="flex max-w-lg items-start gap-0.5">
          <DataDisplay
            title="Created at"
            value={moment.utc(props?.task?.created_at).format("YYYY-MM-DD")}
          />
          <DataDisplay
            title="Due on"
            value={moment.utc(props?.task?.dueDate).format("YYYY-MM-DD")}
          />
        </div>
        <div>
          <div>
            <Typography className="text-expectoo-shades-gray-2.5 text-sm font-normal capitalize">
              {`Last modified on: ${moment
                .utc(props?.task?.updated_at)
                .format("YYYY-MM-DD")}`}
            </Typography>
          </div>
        </div>
      </div>
      {/* <EditTask/> */}
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
        data={props?.task}
      />
    </section>
  );
};

export default TaskDetail;
