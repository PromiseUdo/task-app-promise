import { object, string } from "yup";

const signInSchema = object().shape({
  email: string()
    .typeError("Email must be string")
    .min(2)
    .email()
    .required("Email is a required field"),
  password: string().min(5).required("Password is a required field"),
});

export default signInSchema;
