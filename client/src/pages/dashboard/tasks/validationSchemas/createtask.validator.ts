import { object, string } from "yup";

const createTaskSchema = object().shape({
  title: string()
    .typeError("Title must be string")
    .min(5)
    .required("Title is a required field"),
  description: string().min(10).required("Description is a required field"),
  dueDate: string().required("Due date is a required field"),
  stage: string().required("Task stage is a required field"),
});

export default createTaskSchema;
