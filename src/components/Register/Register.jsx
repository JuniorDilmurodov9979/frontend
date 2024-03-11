import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { api } from "../../Api/api";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export function Register() {
  const { me, setMe, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const Schema = yup.object().shape({
    first_name: yup
      .string("Please enter your first name")
      .required("Required")
      .min(3, "At least 3 characters must contain!")
      .max(30, "Max 30 characters must contain!"),
    last_name: yup
      .string("Please enter your last name")
      .required("Required")
      .min(3, "At least 3 characters must contain!")
      .max(30, "Max 30 characters must contain!"),
    phone: yup
      .string()
      .required("Required!")
      .min(9, "It must 9 numbers")
      .max(9, "It must 9 numbers"),
    email: yup.string().email().required("Email is required!"),
    password: yup
      .string("It should be mix with numbers and words")
      .min(8, "Min 8 characters must contain")
      .required("Required!"),
  });

  const onSubmit = async (values, actions) => {
    // console.log(values);
    // console.log(actions);
    actions.resetForm();
    const data = await api.user({
      formData: values,
      crud: "post",
      url: "/user/register",
    });
    if (data.status === 201) {
      setToken(data.data.token);
      setMe(data.config.data);
      navigate("/profile/profile");
      console.log(data);
    }
  };
  // console.log(token);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: Schema,
    onSubmit,
  });

  // console.log(formik.errors);
  return (
    <div className=" mx-auto">
      <div className="flex items-center">
        <div className="wrapper__register w-[576px]"></div>
        <div className="flex flex-col ml-[135px] ">
          <h2 className="font-black text-4xl text-[#fff] mb-3 ">Sign Up</h2>
          <div className="flex gap-1">
            <p className="text-sm text-[#fff] ">Already have an account?</p>
            <Link to="/login" className="text-sm text-[#549FF9] ">
              Sign in
            </Link>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col w-[330px] gap-4 mt-5 "
          >
            <div className="flex flex-col gap-2">
              <input
                value={formik.values.first_name}
                onChange={formik.handleChange}
                className={
                  formik.errors.first_name
                    ? "outline-none border-red-500 block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] w-full"
                    : "block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] outline-none"
                }
                type="text"
                placeholder="First name"
                name="first_name"
              />
              {formik.errors.first_name ? (
                <p className="text-xs text-red-500">
                  {formik.errors.first_name}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col gap-2">
              <input
                value={formik.values.last_name}
                onChange={formik.handleChange}
                className={
                  formik.errors.last_name
                    ? "outline-none border-red-500 block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] "
                    : "block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] "
                }
                type="text"
                placeholder="Last name"
                name="last_name"
              />
              {formik.errors.last_name ? (
                <p className="text-xs text-red-500">
                  {formik.errors.last_name}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col gap-2">
              <input
                value={formik.values.phone}
                onChange={formik.handleChange}
                className={
                  formik.errors.phone
                    ? "outline-none border-red-500 block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] "
                    : "block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] "
                }
                type="tel"
                placeholder="Phone "
                name="phone"
              />
              {formik.errors.phone ? (
                <p className="text-xs text-red-500">{formik.errors.phone}</p>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col gap-2">
              <input
                value={formik.values.email}
                onChange={formik.handleChange}
                className={
                  formik.errors.email
                    ? "outline-none border-red-500 block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] "
                    : "block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] "
                }
                type="email"
                placeholder="Email"
                name="email"
              />
              {formik.errors.email ? (
                <p className="text-xs text-red-500">{formik.errors.email}</p>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col gap-2">
              <input
                value={formik.values.password}
                onChange={formik.handleChange}
                className={
                  formik.errors.password
                    ? "outline-none border-red-500 block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] "
                    : "block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] "
                }
                type="password"
                placeholder="Password"
                name="password"
              />
              {formik.errors.password ? (
                <p className="text-xs text-red-500">{formik.errors.password}</p>
              ) : (
                ""
              )}
            </div>

            <button
              disabled={!formik.isValid || formik.isSubmitting}
              className={
                !formik.isValid || formik.isSubmitting
                  ? "text-[#000] font-medium text-lg py-2 text-center bg-[#fff] rounded-3xl mt-4 opacity-35"
                  : "text-[#000] font-medium text-lg py-2 text-center bg-[#fff] rounded-3xl mt-4 opacity-100"
              }
              type="submit"
            >
              {formik.isSubmitting}
              Next Step
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
