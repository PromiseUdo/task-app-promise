import Title from "@/common/Title";
import FormGroup from "@/common/input/FormGroup";
import InputWithAdornment from "@/common/input/InputWithAdornment";
import { useToggleState } from "@/hooks/useToggleState";
import iconComponents from "@/assets/icons/iconComponents";
import Typography from "@/common/Typography";
import Button from "@/common/button";
import signUpSchema from "../validationSchemas/signup.validator";
import { FormikHelpers, useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "@/store/authSlice";
import { useRegisterMutation } from "@/store/usersApiSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";
export type User = {
  username: string;
  email: string;
  password?: string;
  password_confirm: string;
};
const initialState: User = {
  username: "",
  email: "",
  password: "",
  password_confirm: "",
};

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();

  const { state: showPassword, toggle: togglePasswordShow } = useToggleState();
  const { state: showConfirmPassword, toggle: toggleConfirmPasswordShow } =
    useToggleState();

  useEffect(() => {
    if (user) {
      navigate("/app/dashboard");
    }
  }, [navigate, user]);

  const submitHandler = async (
    values: User & { password_confirm: string },
    {
      setSubmitting,
      resetForm,
    }: FormikHelpers<User & { password_confirm: string }>
  ) => {
    const { username, email, password } = values;
    try {
      const res = await register({ username, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/app/dashboard");
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
  } = useFormik<User>({
    initialValues: initialState,
    onSubmit: submitHandler,
    validationSchema: signUpSchema,
  });

  return (
    <div className="w-full px-4 sm:px-[19%] lg:px-[10%]  h-full flex flex-col gap-4">
      <Title>Expectask - Create Account</Title>
      <div className="flex flex-col gap-1 ">
        <Typography
          as="h2"
          className="text-[#435156] text-[28px] leading-[140%] font-medium sm:leading-[130%] sm:text-[38px] whitespace-nowrap"
        >
          Welcome!
        </Typography>
      </div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <FormGroup id="username" label="Username" className="w-full ">
          <InputWithAdornment
            placeholder="username"
            type="text"
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            error={
              errors.username &&
              (touched.username as unknown as string) &&
              errors.username
            }
          />
        </FormGroup>
        <FormGroup id="email" label="Email" className="w-full">
          <InputWithAdornment
            placeholder="Email"
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={
              errors.email &&
              (touched.email as unknown as string) &&
              errors.email
            }
          />
        </FormGroup>
        <FormGroup id="password" label="Password" className="w-full">
          <InputWithAdornment
            placeholder="Password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={
              (errors.password && touched.password && errors.password) || ""
            }
            type={showPassword ? "text" : "password"}
            right={
              <span onClick={togglePasswordShow} className="">
                {showPassword ? (
                  <iconComponents.util.EyeCloseIcon className="stroke-expectoo-shades-black fill-expectoo-shades-black" />
                ) : (
                  <iconComponents.util.EyeOpenIcon className="stroke-expectoo-shades-black fill-expectoo-shades-black" />
                )}
              </span>
            }
          />
        </FormGroup>
        <FormGroup
          id="password_confirm"
          label="Confirm Password"
          className="w-full"
        >
          <InputWithAdornment
            placeholder="Password"
            name="password_confirm"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password_confirm}
            error={
              (errors.password_confirm &&
                touched.password_confirm &&
                errors.password_confirm) ||
              ""
            }
            type={showConfirmPassword ? "text" : "password"}
            right={
              <span onClick={toggleConfirmPasswordShow} className="">
                {showConfirmPassword ? (
                  <iconComponents.util.EyeCloseIcon className="stroke-expectoo-shades-black fill-expectoo-shades-black" />
                ) : (
                  <iconComponents.util.EyeOpenIcon className="stroke-expectoo-shades-black fill-expectoo-shades-black" />
                )}
              </span>
            }
          />
        </FormGroup>

        <Button
          disabled={isLoading || !isValid}
          loading={isLoading}
          label="Sign Up"
          variant="primary"
          className="w-full !uppercase"
          type="submit"
        />
      </form>
    </div>
  );
};

export default SignUp;
