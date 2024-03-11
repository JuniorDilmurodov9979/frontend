import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { api } from "../../Api/api";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export function AddAuthor() {
  const { token } = useContext(UserContext);
  const [imageSrc, setImageSrc] = useState();
  const [genre, setGenre] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getGenre = axios
      .get("http://localhost:5000/genre")
      .then((res) => setGenre(res.data));
  }, []);

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
    date_of_birth: yup.string().required("Required!").max(9, "Max 9 numbers"),
    date_of_death: yup.string().required("Required!"),
    country: yup
      .string("It should be mix with numbers and words")
      .min(2, "Min 2 characters must contain")
      .required("Required!"),
  });

  const onSubmit = async (values, actions) => {
    const formData = new FormData();
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("date_of_birth", values.date_of_birth);
    formData.append("date_of_death", values.date_of_death);
    formData.append("country", values.country);
    formData.append("genre_id", values.genre_id);
    formData.append("bio", values.bio);

    if (values.image instanceof File) {
      formData.append("image", values.image);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/author",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      console.log(response);

      if (response.status === 201) {
        actions.resetForm();
        alert("Created");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // console.log(token);

  const handleFileChange = (event) => {
    const choosedFile = event.target.files[0];
    console.log(choosedFile);

    if (choosedFile) {
      const reader = new FileReader();

      reader.onload = function () {
        setImageSrc(reader.result);
      };

      reader.readAsDataURL(choosedFile);
    }
    formik.setFieldValue("image", choosedFile);
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      date_of_birth: "",
      date_of_death: "",
      country: "",
      genre_id: "",
      bio: "",
      image: imageSrc,
    },
    validationSchema: Schema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex gap-[123px]">
      <div className="flex justify-center items-center w-[576px] bg-[#1B1B1B] h-screen ">
        <div className=" ">
          <div className="add-book__wrapper">
            <img src={imageSrc} id="book_img" />
            <input
              name="image"
              type="file"
              id="book_input"
              onChange={handleFileChange}
            />
            <label htmlFor="book_input" id="book_label">
              Click or drag file to this area to upload
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-12 mb-12">
        <h2 className="text-[32px] font-semibold text-[#fff] mb-3 ">
          Add author
        </h2>
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-2">
            <input
              name="first_name"
              onChange={formik.handleChange}
              value={formik.values.first_name}
              type="text"
              placeholder="First name"
              className={
                formik.errors.first_name
                  ? "outline-none border-red-500 block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] w-full"
                  : "block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] outline-none"
              }
            />

            {formik.errors.first_name ? (
              <p className="text-xs text-red-500">{formik.errors.first_name}</p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              type="text"
              placeholder="Last name"
              className={
                formik.errors.last_name
                  ? "outline-none border-red-500 block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] w-full"
                  : "block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] outline-none"
              }
            />
            {formik.errors.last_name ? (
              <p className="text-xs text-red-500">{formik.errors.last_name}</p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              name="date_of_birth"
              value={formik.values.date_of_birth}
              onChange={formik.handleChange}
              type="text"
              placeholder="Date of birth"
              className={
                formik.errors.date_of_birth
                  ? "outline-none border-red-500 block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] w-full"
                  : "block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] outline-none"
              }
            />
            {formik.errors.date_of_birth ? (
              <p className="text-xs text-red-500">
                {formik.errors.date_of_birth}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              name="date_of_death"
              value={formik.values.date_of_death}
              onChange={formik.handleChange}
              type="text"
              placeholder="Date of death"
              className={
                formik.errors.date_of_death
                  ? "outline-none border-red-500 block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] w-full"
                  : "block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] outline-none"
              }
            />
            {formik.errors.date_of_death ? (
              <p className="text-xs text-red-500">
                {formik.errors.date_of_death}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              type="text"
              placeholder="Country"
              className={
                formik.errors.country
                  ? "outline-none border-red-500 block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] w-full"
                  : "block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] outline-none"
              }
            />
            {formik.errors.country ? (
              <p className="text-xs text-red-500">{formik.errors.country}</p>
            ) : (
              ""
            )}
          </div>
          <select
            value={formik.values.genre_id}
            name="genre_id"
            onChange={formik.handleChange}
            className="select__path text-[#fff] text-sm py-3 px-6 rounded-lg border border-[rgb(180, 180, 187)] bg-transparent"
          >
            <option selected disabled hidden>
              Genre
            </option>
            {genre?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <textarea
            value={formik.values.bio}
            name="bio"
            onChange={formik.handleChange}
            placeholder="Bio"
            className="text-[#fff] text-sm py-3 px-6 rounded-lg border border-[rgb(180, 180, 187)] w-[330px] h-[82px] resize-none  bg-transparent"
          ></textarea>
          <button
            className="bg-white rounded-3xl text-lg font-medium text-[#000] text-center p-3 mt-7 "
            type="submit"
          >
            Create
          </button>
        </div>
      </div>
    </form>
  );
}
