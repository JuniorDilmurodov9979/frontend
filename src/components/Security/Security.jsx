import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";

export function Security() {
  const { getMe, setGetMe, token, me, setMe } = useContext(UserContext);
  const meObj = JSON.parse(me);
  const navigate = useNavigate();
  // console.log(meObj);
  // GET ME
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/me", {
          headers: { Authorization: token },
        });
        setGetMe(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getData();
  }, [token, setGetMe, me]);

  const Schema = yup.object().shape({
    email: yup.string("Please enter your email").required("Required"),
    currentPassword: yup
      .string("It should be mix with numbers and words")
      .min(8, "Min 8 characters must contain")
      .required("Required!"),
    newPassword: yup
      .string("It should be mix with numbers and words")
      .min(8, "Min 8 characters must contain")
      .required("Required!"),
  });

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("currentPassword", values.currentPassword);
      formData.append("newPassword", values.newPassword);
      const response = await axios.put(
        "http://localhost:5000/user/security",
        formData,
        {
          headers: {
            Authorization: token,
            // "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        navigate("/");
        window.location.reload();
        alert(response.data);
      }
      formik.setValues({
        ...values,
        currentPassword: "",
      });

      if (response.data.password) {
        setMe(response.data);
      }

      setGetMe(response.data);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: getMe.email || "",
      currentPassword: meObj.password || "",
      newPassword: getMe.newPassword || "",
    },
    validationSchema: Schema,
    onSubmit,
  });
  console.log(formik);
  // PUT SECURITY

  useEffect(() => {
    formik.setValues({
      email: getMe.email || "",
      currentPassword: meObj.password || "",
      newPassword: getMe.newPassword || "",
    });
  }, [getMe]);

  console.log(getMe);
  // console.log(formik);
  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="container max-w-[993px] mb-16 mx-auto flex gap-[108px] mt-[83px] justify-center "
      >
        <div className="flex flex-col mt-[43px] w-[712px] ">
          <h2 className="mb-8 font-medium text-[#DEDEDE] text-lg ">
            Change Or Recover Your Password:
          </h2>
          <div className="flex w-full gap-7 flex-col">
            <div className="flex flex-col gap-2">
              <label
                className="text-[#F3F6F9] text-[13px] mb-2 block leading-5 "
                htmlFor="email"
              >
                Email
              </label>

              <input
                value={formik.values.email}
                onChange={formik.handleChange}
                type="text"
                placeholder="Email"
                name="email"
                className={
                  formik.errors.email
                    ? "outline-none border-red-500 block border rounded-[10px] py-4 px-8  placeholder-[aaa] w-full"
                    : "block border rounded-[10px]  py-4 px-8  placeholder-[aaa] outline-none"
                }
              />
              {formik.errors.email ? (
                <p className="text-xs text-red-500">{formik.errors.email}</p>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-[#F3F6F9] mb-2 block text-[13px] leading-5 "
                htmlFor="password"
              >
                Current password
              </label>
              <input
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                name="currentPassword"
                type="password"
                placeholder="Please enter current password."
                className={
                  formik.errors.currentPassword
                    ? "outline-none border-red-500 block border rounded-[10px] py-4 px-8  placeholder-[aaa] w-full"
                    : "block border rounded-[10px]  py-4 px-8  placeholder-[aaa] outline-none"
                }
              />
              {formik.errors.currentPassword ? (
                <p className="text-xs text-red-500">
                  {formik.errors.currentPassword}
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="text-[#F3F6F9] mb-2 block text-[13px] leading-5 "
                htmlFor="new_password"
              >
                New Password
              </label>
              <input
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                name="newPassword"
                type="password"
                placeholder="Please enter new password."
                className={
                  formik.errors.newPassword
                    ? "outline-none border-red-500 block border rounded-[10px] py-4 px-8  placeholder-[aaa] w-full"
                    : "block border rounded-[10px]  py-4 px-8  placeholder-[aaa] outline-none"
                }
              />
              {formik.errors.newPassword ? (
                <p className="text-xs text-red-500">
                  {formik.errors.newPassword}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <button
            className="text-[#0D0D0D] p-3 text-center bg-[#F1F6FF] rounded font-semibold text-[13px] leading-5 mt-[89px] block w-[142px] self-end "
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
}
