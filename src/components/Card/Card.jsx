import { NavLink, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { Item } from "../Item/Item";

export function Card() {
  const navigate = useNavigate();
  const [genre, setGenre] = useState([]);
  const [author, setAuthor] = useState([]);
  const [idA, setIdA] = useState(1);
  const { token } = useContext(UserContext);

  useEffect(() => {
    const getGenre = axios
      .get("http://localhost:5000/genre")
      .then((res) => setGenre(res.data));
  }, []);
  // console.log(genre);  

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

  const handleGenreChange = (id) => {
    setIdA(id);
  };
  // console.log(author); 
  return (
    <div className="">
      <div className="mt-[184px] ">
        <h2 className="text-[#C9AC8C] text-[32px] font-normal text-center">
          Asosiy kategoriyalar
        </h2>
        <ul className="flex gap-[54px] justify-center mt-6 mb-[54px] ">
          <li>
            <NavLink onClick={() => handleGenreChange(1)} to="/">
              <p className="text-lg category__active ">Temuriylar davri</p>
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => handleGenreChange(2)} to="jadid">
              <p className="text-lg category__active ">Jadid adabiyoti</p>
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => handleGenreChange(3)} to="sovet">
              <p className="text-lg category__active ">Sovet davri </p>
            </NavLink>
          </li>
          <li>
            <NavLink onClick={() => handleGenreChange(4)} to="mustaqillik">
              <p className="text-lg category__active ">Mustaqillik davri</p>
            </NavLink>
          </li>
        </ul>
      </div>
      <ul className="flex gap-y-6 gap-x-5 mb-[138px] flex-wrap">
        {author.length === 1 ? (
          <Item
            img={author.image}
            title={author.first_name + author.last_name}
            birth_date={author.date_of_birth}
            death_date={author.date_of_death}
            id={author.id}
          />
        ) : (
          author.map((item) => (
            <Item
              key={item.id}
              img={item.image}
              title={item.first_name + " " + item.last_name}
              birth_date={item.date_of_birth}
              death_date={item.date_of_death}
              id={item.id}
            />
          ))
        )}
      </ul>
    </div>
  );
}
