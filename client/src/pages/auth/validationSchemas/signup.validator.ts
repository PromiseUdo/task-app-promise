/* eslint-disable no-useless-escape */
import { lazy, object, string, ref } from "yup";

export const format = /^[\!@\#\$\%\^\&\*\_\(\)\-\+\=\~\`\.\w]*$/;
export const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\S]{8,}$/;
const signUpSchema = object().shape({
  email: string()
    .typeError("Email must be a string")
    .min(2)
    .email()
    .required("Email is a required field"),
  username: string().required("Username is a required field"),
  password: string()
    .required("Password is required")
    .matches(
      passwordFormat,
      "Password must include both lower and upper case characters, include at least one number, include at least one special character, be at least 8 characters long."
    )
    .test(
      "special-chars",
      "Password must contain special characters",
      function (value) {
        return format.test(value as unknown as string);
      }
    ),
  // .strict(true),
  password_confirm: string()
    .required("Confirm Password is required")
    .oneOf([ref("password")], "Passwords must match"),
});

export default signUpSchema;
