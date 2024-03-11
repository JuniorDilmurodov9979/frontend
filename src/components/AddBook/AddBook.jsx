import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { api } from "../../Api/api";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export function AddBook() {
  const { token } = useContext(UserContext);
  const [imageSrc, setImageSrc] = useState();
  const [genre, setGenre] = useState([]);
  const [author, setAuthor] = useState([]);
  const [idA, setIdA] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const getGenre = axios
      .get("http://localhost:5000/genre")
      .then((res) => setGenre(res.data));
  }, []);

  useEffect(() => {
    const getAuthor = axios
      .get(`http://localhost:5000/author/genreId/${idA}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      })
      .then((res) => setAuthor(res.data));
  }, [idA]);
  console.log(author);
  console.log(genre);

  const Schema = yup.object().shape({
    title: yup
      .string("Please enter your first name")
      .required("Required")
      .min(3, "At least 3 characters must contain!")
      .max(30, "Max 30 characters must contain!"),
    page: yup
      .string("Please enter your last name")
      .required("Required")
      .min(3, "At least 3 characters must contain!")
      .max(30, "Max 30 characters must contain!"),
    year: yup.string().required("Required!").max(9, "Max 9 numbers"),
    price: yup.string().required("Required!"),
    description: yup
      .string("It should be mix with numbers and words")
      .min(2, "Min 2 characters must contain")
      .required("Required!"),
  });

  const onSubmit = async (values, actions) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("page", values.page);
    formData.append("year", values.year);
    formData.append("price", values.price);
    formData.append("author_id", values.author_id);
    formData.append("genre_id", values.genre_id++);
    formData.append("description", values.description);

    if (values.image instanceof File) {
      formData.append("image", values.image);
    }
    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:5000/book",
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
      title: "",
      page: "",
      year: "",
      price: "",
      genre_id: "",
      author_id: "",
      description: "",
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
          Add book
        </h2>
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-2">
            <input
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              type="text"
              placeholder="Title"
              className={
                formik.errors.title
                  ? "outline-none border-red-500 block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] w-full"
                  : "block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] outline-none"
              }
            />

            {formik.errors.title ? (
              <p className="text-xs text-red-500">{formik.errors.title}</p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              name="page"
              value={formik.values.page}
              onChange={formik.handleChange}
              type="number"
              placeholder="Pages"
              className={
                formik.errors.page
                  ? "outline-none border-red-500 block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] w-full"
                  : "block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] outline-none"
              }
            />
            {formik.errors.page ? (
              <p className="text-xs text-red-500">{formik.errors.page}</p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              name="year"
              value={formik.values.year}
              onChange={formik.handleChange}
              type="number"
              placeholder="Year"
              className={
                formik.errors.year
                  ? "outline-none border-red-500 block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] w-full"
                  : "block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] outline-none"
              }
            />
            {formik.errors.year ? (
              <p className="text-xs text-red-500">{formik.errors.year}</p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              type="number"
              placeholder="Price"
              className={
                formik.errors.price
                  ? "outline-none border-red-500 block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] w-full"
                  : "block border rounded-[10px] bg-transparent py-4 px-8 text-[#fff] placeholder-[aaa] outline-none"
              }
            />
            {formik.errors.price ? (
              <p className="text-xs text-red-500">{formik.errors.price}</p>
            ) : (
              ""
            )}
          </div>
          <select
            value={formik.values.genre_id}
            name="genre_id"
            onChange={(e) => {
              setIdA(e.target.value);
              formik.handleChange(e);
            }}
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
          <select
            value={formik.values.author_id}
            name="author_id"
            onChange={formik.handleChange}
            className="select__path text-[#fff] text-sm py-3 px-6 rounded-lg border border-[rgb(180, 180, 187)] bg-transparent"
          >
            <option selected disabled hidden>
              Author
            </option>
            {author.length === 1 ? (
              <option key={author.id} value={author.id}>
                {author.first_name}
              </option>
            ) : (
              author.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.first_name}
                </option>
              ))
            )}
          </select>
          <textarea
            value={formik.values.description}
            name="description"
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
