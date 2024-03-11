import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Security } from "../Security/Security";
import { api } from "../../Api/api";
import { useFormik } from "formik";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import * as yup from "yup";

export function HeaderProfile() {
  return (
    <>
      <div className="container__profile bg-[rgb(245, 245, 245)]">
        <div className="flex bg-[#2D2D2D]">
          <NavLink to="/profile/profile" activeclassname="active" className="">
            <div className="flex gap-2 items-center border rounded w-[400px] p-[22px] profile__inner">
              <span className="profile__active px-3 py-[6px] font-semibold text-[16px] text-[#8F9294] border-[1px] border-[rgb(229, 234, 238)] rounded ">
                1
              </span>
              <p className="profile__text font-semibold text-[#8F9294] text-sm ">
                Profile
              </p>
            </div>
          </NavLink>
          <NavLink
            to="/profile/security"
            activeclassname="active"
            className=" "
          >
            <div className="flex gap-2 items-center border rounded w-[400px] p-[22px] profile__inner">
              <span className="profile__active px-3 py-[6px] font-semibold text-[16px] text-[#8F9294] border-[1px] border-[rgb(229, 234, 238)] rounded ">
                2
              </span>
              <p className="profile__text font-semibold text-[#8F9294] text-sm ">
                Security
              </p>
            </div>
          </NavLink>
          <NavLink to="/profile/settings" activeclassname="active" className="">
            <div className="flex gap-2 items-center border rounded w-[400px] p-[22px] profile__inner">
              <span className="profile__active px-3 py-[6px] font-semibold text-[16px] text-[#8F9294] border-[1px] border-[rgb(229, 234, 238)] rounded ">
                3
              </span>
              <p className="profile__text font-semibold text-[#8F9294] text-sm ">
                Settings
              </p>
            </div>
          </NavLink>
        </div>
      </div>
      <div className="">
        <Outlet />
      </div>
    </>
  );
}

export function Profile() {
  const { token, setGetMe, getMe } = useContext(UserContext);
  const [imageSrc, setImageSrc] = useState(getMe.image || "");
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/me", {
          headers: { Authorization: token },
        });
        setGetMe(response.data);
        setImageSrc(response.data.image || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getData();
  }, [token, setGetMe]);

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
  });

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      formData.append("phone", values.phone);
      if (values.image instanceof File) {
        formData.append("image", values.image);
      }
      const response = await axios.put(
        "http://localhost:5000/user/account",
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        navigate("/");
        window.location.reload();
        alert(response.data);
      }
      setGetMe(response.data);
      setImageSrc(response.data.image || "");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      first_name: getMe.first_name || "",
      last_name: getMe.last_name || "",
      phone: getMe.phone || "",
      image: getMe.image || "",
    },
    validationSchema: Schema,
    onSubmit,
  });

  useEffect(() => {
    formik.setValues({
      first_name: getMe.first_name || "",
      last_name: getMe.last_name || "",
      phone: getMe.phone || "",
      image: getMe.image || "",
    });
  }, [getMe]);

  const handleFileChange = (event) => {
    const choosedFile = event.target.files[0];
    console.log(choosedFile);
    if (choosedFile) {
      formik.setFieldValue("image", choosedFile);
    }
  };
  console.log(getMe);

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="container max-w-[993px] mx-auto mb-16 flex gap-[108px] mt-[83px] "
      >
        <div className="profile-pic-div">
          <img src={`http://localhost:5000/${imageSrc}`} id="photo" />
          <input
            name="image"
            type="file"
            id="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file" id="uploadBtn"></label>
        </div>
        <div className="flex flex-col mt-[43px] w-[712px] ">
          <h2 className="mb-8 font-medium text-[#DEDEDE] text-lg ">
            My profile
          </h2>
          <div className="flex w-full gap-7 flex-col border-b-[1px] border-[#161D23] pb-7">
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
          </div>
          <button
            className="text-[#0D0D0D] p-3 text-center bg-[#F1F6FF] rounded font-semibold text-[13px] leading-5 mt-11 block w-[142px] self-end "
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
}
