import { Carousel } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { Header } from "../Header/Header";
import { Search } from "../Search/Search";
import { Card } from "../Card/Card";
import { Item } from "../Item/Item";
import { NavLink } from "react-router-dom";
import { ItemBooks } from "../Item/ItemBook";

export function Books() {
  const [genre, setGenre] = useState([]);
  const [book, setBook] = useState([]);
  const [idA, setIdA] = useState(1);
  const [author, setAuthor] = useState([]);
  const { token } = useContext(UserContext);

  useEffect(() => {
    const getGenre = axios
      .get("http://localhost:5000/genre")
      .then((res) => setGenre(res.data));
  }, []);
  console.log(genre);

  useEffect(() => {
    const getBook = axios
      .get(`http://localhost:5000/author/books/${idA}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      })
      .then((res) => setBook(res.data));
  }, [idA]);
  useEffect(() => {
    const getAuthor = axios
      .get(`http://localhost:5000/author/authorId/${idA}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      })
      .then((res) => setAuthor(res.data));
  }, [idA]);
  console.log(author);
  const handleGenreChange = (id) => {
    setIdA(id);
  };
  console.log(book);

  return (
    <>
      <Header />
      <div className="bg__body">
        <div className="container__header">
          <div className="">
            <div className="relative">
              <Carousel
                loop
                prevArrow={() => {
                  false;
                }}
                nextArrow={() => {
                  false;
                }}
                className="rounded-xl h-[347px] "
                navigation={({ setActiveIndex, activeIndex, length }) => (
                  <div className="absolute bottom-32 left-40  z-50 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                      <span
                        key={i}
                        className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                          activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                        }`}
                        onClick={() => setActiveIndex(i)}
                      />
                    ))}
                  </div>
                )}
              >
                <img
                  src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
                  alt="image 1"
                  className="h-full w-full object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                  alt="image 2"
                  className="h-full w-full object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                  alt="image 3"
                  className="h-full w-full object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                  alt="image 3"
                  className="h-full w-full object-cover"
                />
              </Carousel>

              <Search />
            </div>
            <div className="">
              <div className="mt-[184px] ">
                <h2 className="text-[#C9AC8C] text-[32px] font-normal text-center">
                  Asosiy kategoriyalar
                </h2>
                <ul className="flex gap-[54px] justify-center mt-6 mb-[54px] ">
                  <li>
                    <NavLink onClick={() => handleGenreChange(1)} to="temuriy">
                      <p className="text-lg category__active ">
                        Temuriylar davri
                      </p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={() => handleGenreChange(2)} to="jadid">
                      <p className="text-lg category__active ">
                        Jadid adabiyoti
                      </p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={() => handleGenreChange(3)} to="sovet">
                      <p className="text-lg category__active ">Sovet davri </p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => handleGenreChange(4)}
                      to="mustaqillik"
                    >
                      <p className="text-lg category__active ">
                        Mustaqillik davri
                      </p>
                    </NavLink>
                  </li>
                </ul>
              </div>
              <ul className="flex gap-y-6 gap-x-5 mb-[138px] flex-wrap">
                {book.length === 1 ? (
                  <ItemBooks
                    id={book[0].id}
                    img={book[0].image}
                    title={book[0].title}
                    desc={author.first_name + " " + author.last_name}
                  />
                ) : (
                  book.map((item) => (
                    <ItemBooks
                      id={item.id}
                      key={item.id}
                      img={item.image}
                      title={item.title}
                      desc={item.description}
                    />
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
