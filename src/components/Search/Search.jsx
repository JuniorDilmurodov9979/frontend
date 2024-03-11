import axios from "axios";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Item } from "../Item/Item";

export function Search({ path, query }) {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const handleSearch = async (e) => {
    e.preventDefault();
    const value = e.target[0].value; // Access the input value correctly
    console.log(value);
    try {
      const searchData = await axios
        .get(`http://localhost:5000/${path}?${query}=${value}`)
        .then((res) => setData(res.data));
      navigate("search");
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  function handleChange(e) {
    const value = e.target.value;
    console.log(value);
    try {
      const searchData = axios
        .get(`http://localhost:5000/${path}?${query}=${value}`)
        .then((res) => setData(res.data));
      navigate("search");
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }
  console.log(data);
  return (
    <>
      <div className="flex flex-col">
        <div className="search__bar-wrapper flex-col gap-4">
          <h1 className="text-[#C9AC8C] text-[32px] font-normal text-center  ">
            Qidirish
          </h1>
          <form onSubmit={handleSearch} className="flex gap-3">
            <input
              onChange={handleChange}
              className="placeholder:font-normal text-base text-white placeholder:opacity-30 w-[710px] px-7 py-3 bg-[#404040] rounded-2xl "
              type="text"
              placeholder="Adiblar, kitoblar, audiolar, maqolalar..."
            />
            <button
              type="submit"
              className="relative btn__search text-base text-[#3C2710] bg-[#C9AC8C] w-[160px] p-4 text-center rounded-2xl "
            >
              Izlash
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
