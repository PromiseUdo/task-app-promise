import Title from "@/common/Title";
import FormGroup from "@/common/input/FormGroup";
import InputWithAdornment from "@/common/input/InputWithAdornment";
import { useToggleState } from "@/hooks/useToggleState";
import iconComponents from "@/assets/icons/iconComponents";
import Typography from "@/common/Typography";
import Button from "@/common/button";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "@/store/usersApiSlice";
import { SigninDTO, setCredentials } from "@/store/authSlice";
import { useEffect } from "react";
import { FormikHelpers, useFormik } from "formik";
import signInSchema from "../validationSchemas/signin.validator";
import toast from "react-hot-toast";

const initialState: SigninDTO = {
  email: "",
  password: "",
};

const SignIn = () => {
  const { state: showPassword, toggle: togglePasswordShow } = useToggleState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { user } = useSelector((state: any) => state.auth);
  useEffect(() => {
    if (user) {
      navigate("/app/dashboard");
    }
  }, [navigate, user]);
  const submitHandler = async (
    values: SigninDTO,
    { setSubmitting, resetForm }: FormikHelpers<SigninDTO>
  ) => {
    const { email, password } = values;
    try {
      const res = await login({ email, password }).unwrap();
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
  } = useFormik<SigninDTO>({
    initialValues: initialState,
    onSubmit: submitHandler,
    validationSchema: signInSchema,
  });
  return (
    <div className="px-4 w-full flex flex-col gap-6 sm:gap-10 justify-start items-center sm:px-[15%] mb-12">
      <Title>Expectask - Sign In</Title>
      <header className="flex flex-col gap-1 w-full">
        <Typography
          as="h2"
          className="text-[#435156] text-[28px] leading-[140%] font-medium sm:leading-[130%] sm:text-[38px] whitespace-nowrap"
        >
          Sign In
        </Typography>
        <Typography
          as="p"
          className="text-sm text-expectoo-shades-gray-2.5 sm:text-lg text-normal "
        >
          Welcome back! Sign in using your resgistered email and password
        </Typography>
      </header>

      <form
        onSubmit={handleSubmit}
        className="grid grid-rows-3 grid-cols-1 w-full gap-y-4"
      >
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
              errors.password &&
              (touched.password as unknown as string) &&
              errors.password
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

        <Button
          disabled={isLoading || !isValid}
          loading={isLoading}
          fullWidth
          type="submit"
          label="Sign In"
          variant="primary"
          className="w-full !uppercase"
        />
        {/* </div> */}
        <div className="flex items-center justify-center">
          <Typography className="text-sm text-expectoo-gray-600 font-light">
            Do not have an account yet?{" "}
            <span
              onClick={() => navigate("/auth/sign-up")}
              className="underline cursor-pointer"
            >
              Signup
            </span>
          </Typography>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
