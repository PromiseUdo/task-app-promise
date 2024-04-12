import Button from "@/common/button";
import DatePicker from "@/common/input/DatePicker";
import FormGroup from "@/common/input/FormGroup";
import InputWithAdornment from "@/common/input/InputWithAdornment";
import SelectInput from "@/common/input/SelectInput";
import Textarea from "@/common/input/TextArea";
import Modal from "@/common/modal/Modal";
import ModalHeader from "@/common/modal/ModalHeader";
import { FormikHelpers, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import createTaskSchema from "../validationSchemas/createtask.validator";
import { useCreateTaskMutation, useGetTasksQuery } from "@/store/tasksApiSlice";
import toast from "react-hot-toast";
type CreateTaskProps = {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
};

interface Task {
  title: string;
  description: string;
  dueDate: string | null;
  stage: string;
  completed: boolean;
}

const initialState: Task = {
  title: "",
  description: "",
  dueDate: "",
  stage: "",
  completed: false,
};

const CreateTask = (props: CreateTaskProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const { data: tasks, isLoading: refetchLoading } = useGetTasksQuery({
    userId: user._id,
  });

  const { open, onClose, refetch } = props;
  const closeHandler = () => {
    onClose();
  };

  const submitHandler = async (
    values: Task,
    { setSubmitting, resetForm }: FormikHelpers<Task>
  ) => {
    const { title, description, dueDate, stage } = values;
    try {
      const res = await createTask({
        id: user._id,
        title,
        description,
        dueDate,
        stage,
      }).unwrap();
      refetch();
      navigate("/app/tasks");
      toast.success("Task created successfully");
      closeHandler();
    } catch (error: any) {
      toast.error(error?.data?.message);
      console.log(error);
    }
  };

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors,
    isValid,
  } = useFormik<Task>({
    initialValues: initialState,
    onSubmit: submitHandler,
    validationSchema: createTaskSchema,
  });
  return (
    <Modal
      open={open}
      onClose={closeHandler}
      variant="sm"
      className="p-4 md:p-6"
    >
      <ModalHeader
        onClose={closeHandler}
        title="Create Task"
        subText="Provide details of your new task"
      />
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-start gap-14 "
      >
        <div className="flex flex-col items-start gap-4 w-full ">
          <FormGroup id="message" label="Task Title">
            <InputWithAdornment
              name="title"
              placeholder="Task Title"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              error={
                errors.title &&
                (touched.title as unknown as string) &&
                errors.title
              }
            />
          </FormGroup>

          <FormGroup id="description" label="Description" subtext={`123 / 200`}>
            <Textarea
              name="description"
              className="select md !normal-case"
              rows={3}
              placeholder="Task description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              error={
                errors.description &&
                (touched.description as unknown as string) &&
                errors.description
              }
            />
          </FormGroup>
          <FormGroup id="due_date" label="Due Date" subtext={`123 / 200`}>
            <DatePicker
              id="datePicker"
              name="dueDate"
              className="select md !normal-case"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.dueDate || ""}
              error={
                errors.dueDate &&
                (touched.dueDate as unknown as string) &&
                errors.dueDate
              }
            />
          </FormGroup>
          <FormGroup id="taskStage" label="Task Stage">
            <SelectInput
              menuClassName="bg-white w-[240px] top-[0px] z-30 !max-h-[220px]"
              name="stage"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.stage}
              className="select"
              options={[
                { label: "Pending", value: "pending" },
                { label: "In progress", value: "inProgress" },
                { label: "Completed", value: "complete" },
              ]}
              optionsText={(item) => item?.label}
              optionsValue={(item) => item?.value}
              error={
                errors.stage &&
                (touched.stage as unknown as string) &&
                errors.stage
              }
            />
          </FormGroup>
        </div>
        <div className="w-full flex items-center pt-3 pb-1 gap-2">
          <Button
            type="submit"
            label="Submit"
            loading={isLoading}
            disabled={isLoading || !isValid}
            className="!uppercase flex-1 sm:flex-none"
          />
          <Button
            label="Cancel"
            onClick={onClose}
            loading={isLoading}
            type="reset"
            className="!uppercase flex-1 sm:flex-none"
            variant="cancel"
          />
        </div>
      </form>
    </Modal>
  );
};

export default CreateTask;
