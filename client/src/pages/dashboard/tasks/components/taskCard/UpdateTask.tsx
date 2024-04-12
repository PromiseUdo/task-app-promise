import Button from "@/common/button";
import DatePicker from "@/common/input/DatePicker";
import FormGroup from "@/common/input/FormGroup";
import InputWithAdornment from "@/common/input/InputWithAdornment";
import SelectInput from "@/common/input/SelectInput";
import Textarea from "@/common/input/TextArea";
import Modal from "@/common/modal/Modal";
import ModalHeader from "@/common/modal/ModalHeader";
import { Task, useUpdateTaskMutation } from "@/store/tasksApiSlice";
import { FormikHelpers, useFormik } from "formik";
import createTaskSchema from "../../validationSchemas/createtask.validator";
import toast from "react-hot-toast";
import { TaskCardProps } from ".";
import moment from "moment";
import { useNavigate } from "react-router-dom";

type IOpenable = {
  open: boolean;
  onClose: () => void;
  data?: TaskCardProps;
  // refetch: () => void;
};

const UpdateTask = (props: IOpenable) => {
  const { open, onClose, data } = props;
  console.log(data);

  const [updateTask, { isLoading }] = useUpdateTaskMutation();
  const navigate = useNavigate();
  const submitHandler = async (
    values: TaskCardProps,
    { setSubmitting, resetForm }: FormikHelpers<TaskCardProps>
  ) => {
    const { title, description, dueDate, stage } = values;
    try {
      const res = await updateTask({
        id: values._id,
        ...values,
      }).unwrap();
      toast.success("Task updated successfully");
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message);
      console.log(error);
    }
  };

  const dueDateString = data ? String(data.dueDate) : "";
  console.log(dueDateString);
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    errors,
    isValid,
  } = useFormik<TaskCardProps>({
    initialValues: {
      ...data!,
      dueDate: moment.utc(data?.dueDate).format("YYYY-MM-DD"), // Format date for input type "date"
    },
    onSubmit: submitHandler,
    validationSchema: createTaskSchema,
  });

  return (
    <Modal open={open} onClose={onClose} variant="sm" className="p-4 md:p-6">
      <ModalHeader onClose={onClose} title="Edit Task" />
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
              value={values.dueDate}
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

export default UpdateTask;
